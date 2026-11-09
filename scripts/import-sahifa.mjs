import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
const PDF_URL="https://www.duas.org/pdfs/Sahifa-Sajjadiya-simple-english.pdf";
const forceRefresh=process.argv.includes("--refresh");
const cleanPrayerText=value=>String(value||"")
 .replace(/(?<=[A-Za-z)\\]'".,;:!?])(?:2[7-9]|[3-9]\\d|1\\d\\d|2[0-6]\\d|27[0-3])(?=\\s|$)/g,"")
 .replace(/\\b1(?=\\s+(?:have|pass|found)\\b)/g,"I");
const normalizeDua=dua=>{
 const editorialIntroduction=cleanPrayerText(dua.editorialIntroduction);
 const paragraphs=dua.paragraphs.map(cleanPrayerText);
 const text=paragraphs.join("\\n\\n");
 return {...dua,editorialIntroduction,paragraphs,text,
  sourceText:[editorialIntroduction,...paragraphs].filter(Boolean).join("\\n\\n"),
  wordCount:text.split(/\\s+/).filter(Boolean).length,
  chunks:paragraphs.map((value,j)=>({id:dua.id+"-p"+String(j+1).padStart(3,"0"),ordinal:j+1,text:value}))};
};
const validateCorpus=corpus=>{
 if(corpus?.count!==54||!Array.isArray(corpus.duas)||corpus.duas.length!==54)throw new Error("Stored Sahifa corpus must contain exactly 54 duas.");
 corpus.duas.forEach((dua,i)=>{
  if(dua.number!==i+1||!dua.id||!Array.isArray(dua.paragraphs)||!dua.paragraphs.length||!dua.text)throw new Error("Stored Sahifa corpus has an incomplete item at ordinal "+(i+1)+".");
 });
 return corpus;
};
if(!forceRefresh){
 try{
  const stored=validateCorpus(JSON.parse(await readFile("data/sahifa/core.json","utf8")));
  await writeFile("sahifa-content.js","window.LITTLE_LANTERNS_SAHIFA = "+JSON.stringify(stored)+";\n");
  console.log("Validated stored corpus: "+stored.count+" supplications ("+stored.duas.reduce((sum,d)=>sum+(d.wordCount||0),0)+" words). Use --refresh to re-import the source PDF.");
  process.exit(0);
 }catch(error){if(error.code!=="ENOENT")throw error;}
}
const response=await fetch(PDF_URL,{headers:{"user-agent":"LittleLanterns-Sahifa-Importer/1.0"}});
if(!response.ok)throw new Error("Could not download credited Sahifa PDF: HTTP "+response.status);
const bytes=Buffer.from(await response.arrayBuffer());
if(bytes.length<100000||bytes.subarray(0,4).toString()!=="%PDF")throw new Error("Source download is not a valid PDF.");
const pdfPath=join(tmpdir(),"little-lanterns-sahifa.pdf");await writeFile(pdfPath,bytes);
const extracted=execFileSync("pdftotext",["-layout",pdfPath,"-"],{encoding:"utf8",maxBuffer:30*1024*1024});
const headings=[...extracted.matchAll(/^\s*S\s*0?(\d{1,2})\s*[-–]\s*(.+?)\s*$/gm)];
if(headings.length!==54)throw new Error("Expected 54 core supplications; found "+headings.length+". Refusing incomplete content.");
const extractSection=raw=>{
 const lines=raw.replace(/\r/g,"").replace(/\f/g,"\n\n").split("\n")
  .map(line=>line.replace(/\s+/g," ").trim())
  .filter(line=>!line||(!/^\d{1,4}$/.test(line)&&!/^SAHIFA SAJJADIYA/i.test(line)));
 const prayerStart=/^(?:Praise\b|O\b|My\b|I\b|We\b|To You\b|You\b|Glory\b|Bless\b|Lord\b|God\b|Give\b|Make\b|Keep\b|Take\b|Have\b|Let\b|May\b|Grant\b|Forgive\b|Preserve\b|Protect\b|Deliver\b|Help\b|Save\b|Guide\b|Accept\b|Bestow\b|Hear\b|Answer\b|Turn\b|Bring\b|Place\b|Set\b|Remove\b|And God bless\b)/i;
 const start=lines.findIndex(line=>prayerStart.test(line));
 const editorialIntroduction=start>0?lines.slice(0,start).filter(Boolean).join(" ").trim():"";
 const bodyLines=start>0?lines.slice(start):lines;
 const paragraphs=bodyLines.join("\n").split(/\n\s*\n/)
  .map(block=>block.split("\n").map(line=>line.trim()).filter(Boolean).join(" ").trim())
  .filter(Boolean);
 return {editorialIntroduction,paragraphs};
};
const duas=headings.map((h,i)=>{const number=Number(h[1]);if(number!==i+1)throw new Error("Unexpected supplication number "+number);const start=h.index+h[0].length,end=i+1<headings.length?headings[i+1].index:extracted.length;const section=extractSection(extracted.slice(start,end)),paragraphs=section.paragraphs;if(!paragraphs.length)throw new Error("Dua "+number+" has no text.");return{id:"sahifa-core-"+String(number).padStart(3,"0"),collection:"al-sahifa-al-sajjadiyya",number,title:h[2].replace(/\s+/g," ").trim(),language:"en",textType:"complete-english-translation",editorialIntroduction:section.editorialIntroduction,paragraphs,sourceText:[section.editorialIntroduction,...paragraphs].filter(Boolean).join("\n\n"),text:paragraphs.join("\n\n"),wordCount:paragraphs.join(" ").split(/\s+/).filter(Boolean).length,sourcePageUrl:"https://www.duas.org/s"+String(number).padStart(2,"0")+".htm",sourcePdfUrl:PDF_URL,translationAttribution:"English translation source: duas.org; English-only PDF distributed by The Rashed Foundation; individual duas.org pages credit Al-Islam.org.",reproductionPermission:"Permission confirmed by the project maintainer.",chunks:paragraphs.map((text,j)=>({id:"sahifa-core-"+String(number).padStart(3,"0")+"-p"+String(j+1).padStart(3,"0"),ordinal:j+1,text}))};});
const cleanedDuas=duas.map(normalizeDua);\nconst corpus={schemaVersion:"1.0.0",collectionId:"al-sahifa-al-sajjadiyya-core",title:"Al-Sahifa al-Sajjadiyya — 54 Core Supplications",author:"Imam Ali ibn al-Husayn Zayn al-Abidin (peace be upon him)",language:"en",contentType:"complete-translation",sourceEdition:{pdfUrl:PDF_URL,websiteIndex:"https://www.duas.org/sajjadiya.htm",translationSource:"duas.org",distributor:"The Rashed Foundation",courtesyCredit:"Al-Islam.org (as credited on individual duas.org pages)",permissionStatus:"Permission confirmed by the project maintainer."},attribution:"Reproduced with permission. Please retain source and distributor credits.",count:cleanedDuas.length,totalWordCount:cleanedDuas.reduce((sum,d)=>sum+d.wordCount,0),duas:cleanedDuas};
validateCorpus(corpus);
await mkdir("data/sahifa",{recursive:true});await writeFile("data/sahifa/core.json",JSON.stringify(corpus,null,2)+"\n");await writeFile("sahifa-content.js","window.LITTLE_LANTERNS_SAHIFA = "+JSON.stringify(corpus)+";\n");
console.log("Imported and validated "+duas.length+" supplications ("+duas.reduce((sum,d)=>sum+d.wordCount,0)+" words).");
