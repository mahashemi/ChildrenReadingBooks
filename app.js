const storyPages = [
  { title:"A Special Dream", paragraphs:[
    "Long ago, there lived a kind boy named Yusuf. He loved his father, Yaqub, very much.",
    "One night, Yusuf had a wonderful dream. He saw eleven stars, the sun, and the moon. They seemed to bow before him.",
    "In the morning, he went to his father. He told him about his dream with excitement."
  ]},
  { title:"A Father's Loving Advice", paragraphs:[
    "Yusuf's father listened very carefully. He was a wise and loving father. He understood that the dream was special.",
    "He told Yusuf to keep his dream a secret from his brothers. He did not want them to feel jealous or unhappy.",
    "His father also told him that Allah had chosen him for something special. He would teach him to understand things that others could not.",
    "Yusuf listened to his father. He knew that his father loved him and wanted the best for him.",
    "He decided to follow his father's advice. He felt peaceful and safe."
  ]},
  { title:"A Lesson to Remember", paragraphs:[
    "Yusuf remembered his father's words. He knew that some dreams and important matters should be shared with care.",
    "He continued to grow with patience and trust in Allah. His life would bring many challenges, but he would learn to remain truthful and hopeful.",
    "The story of Yusuf teaches us that Allah knows what we cannot see. It also reminds us to listen to wise advice, be patient, and keep our hearts close to what is good."
  ]}
];

// These are reviewed pronunciation/teaching annotations, not automatic vowel splits.
// Original spelling is retained. Possessive endings are attached after the base word.
const syllables = {
  about:["a","bout"], advice:["ad","vice"], ago:["a","go"], allah:["Al","lah"],
  also:["al","so"], before:["be","fore"], brothers:["broth","ers"],
  carefully:["care","ful","ly"], cannot:["can","not"], challenges:["chal","len","ges"],
  chosen:["cho","sen"], continued:["con","tin","ued"], decided:["de","cid","ed"],
  eleven:["e","lev","en"], excitement:["ex","cite","ment"], father:["fa","ther"],
  follow:["fol","low"], hopeful:["hope","ful"], important:["im","por","tant"],
  jealous:["jeal","ous"], listened:["lis","tened"], listen:["lis","ten"],
  loving:["lov","ing"], many:["man","y"], matters:["mat","ters"],
  morning:["morn","ing"], others:["oth","ers"], patience:["pa","tience"],
  patient:["pa","tient"], peaceful:["peace","ful"], remain:["re","main"],
  remembered:["re","mem","bered"], reminds:["re","minds"], secret:["se","cret"],
  special:["spe","cial"], story:["sto","ry"], something:["some","thing"],
  teaches:["teach","es"], truthful:["truth","ful"], understand:["un","der","stand"],
  understood:["un","der","stood"], unhappy:["un","hap","py"], wanted:["want","ed"],
  very:["ver","y"], wonderful:["won","der","ful"], yusuf:["Yu","suf"], yaqub:["Ya","qub"]
};
const oneSyllable = new Set((
  "a and best be boy bring bow but care close could did dream feel felt for from good grow had he hearts him his in it keep kind knew knows learn life long lived loved much night not of one or our safe saw see shared should some stars sun tell that the them there they things to told trust us very? was we went what with words would"
).split(/\s+/).filter(Boolean));
const meanings = {
  wonderful:"Very special or amazing.", excitement:"A feeling of happiness and eagerness.",
  carefully:"With attention and care.", understood:"Knew the meaning of something.",
  secret:"Something kept private.", jealous:"Feeling unhappy because someone has something you want.",
  peaceful:"Calm, quiet and without worry.", advice:"A helpful suggestion about what to do.",
  patience:"Staying calm while waiting or facing difficulty.", truthful:"Honest; telling what is true.",
  fitrat:"A natural inclination towards truth and goodness."
};
let page=0, mode="syllables", fontSize=19;
const $=id=>document.getElementById(id);
const storyText=$("storyText");
function escapeHtml(value){return value.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function tokenInfo(token){
  const match=token.match(/[A-Za-z]+(?:'[A-Za-z]+)?/);
  if(!match)return null;
  const original=match[0], possessive=/'s$/i.test(original);
  const base=possessive?original.slice(0,-2):original;
  const parts=syllables[base.toLowerCase()]||null;
  const isKnownOne=oneSyllable.has(base.toLowerCase());
  return {original,base,possessive,parts,isKnownOne,known:!!parts||isKnownOne};
}
function renderParagraph(paragraph){
  return paragraph.split(/(\s+)/).map(piece=>{
    if(/^\s+$/.test(piece))return piece;
    const info=tokenInfo(piece);
    if(!info)return escapeHtml(piece);
    const {original,base,possessive,parts,known,isKnownOne}=info;
    const before=piece.slice(0,piece.indexOf(original));
    const after=piece.slice(piece.indexOf(original)+original.length);
    const isMulti=!!parts&&parts.length>1;
    const shouldBreak=mode==="syllables"?isMulti:mode==="mixed"?(isMulti&&base.length>=7):false;
    const shown=shouldBreak?parts.join("-")+(possessive?"'s":""):original;
    const breakdown=parts?parts.join("-")+(possessive?"'s":""):isKnownOne?"One syllable":"Review needed";
    const meaning=meanings[base.toLowerCase()]||"Explore this word in the story. Its child-friendly definition can be added to the vocabulary guide.";
    const className=shouldBreak?(mode==="mixed"?"mixed-word":"syllabified"):"";
    return escapeHtml(before)+'<span class="story-word '+className+'" tabindex="0" role="button" data-word="'+escapeHtml(original)+'" data-parts="'+escapeHtml(breakdown)+'" data-meaning="'+escapeHtml(meaning)+'" aria-label="'+escapeHtml(original)+'">'+escapeHtml(shown)+'</span>'+escapeHtml(after);
  }).join("");
}
function renderStory(){
  const current=storyPages[page];
  $("storyTitle").textContent=current.title;
  $("pageCount").textContent="PAGE "+(page+1)+" OF "+storyPages.length;
  storyText.style.fontSize=fontSize+"px";
  storyText.innerHTML=current.paragraphs.map(p=>"<p>"+renderParagraph(p)+"</p>").join("");
  $("previousPage").disabled=page===0;
  $("nextPage").textContent=page===storyPages.length-1?"Finish story ✓":"Next page →";
  $("progressDots").innerHTML=storyPages.map((_,i)=>'<i class="'+(i===page?"on":"")+'"></i>').join("");
  $("wordPanel").hidden=true;
  $("modeHint").textContent=mode==="syllables"?"Every reviewed multisyllabic word is divided. Tap a word to explore its syllables and meaning.":mode==="mixed"?"Longer reviewed words are divided; familiar and shorter words stay whole.":"Read in ordinary English spelling. Tap a word to explore it.";
}
function selectWord(target){
  $("wordDisplay").textContent=target.dataset.word;
  $("wordBreakdown").textContent=target.dataset.parts;
  $("wordMeaning").textContent=target.dataset.meaning;
  $("wordPanel").hidden=false;
}
storyText.addEventListener("click",e=>{const word=e.target.closest(".story-word");if(word)selectWord(word);});
storyText.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("story-word")){e.preventDefault();selectWord(e.target);}});
document.querySelectorAll(".mode-button").forEach(btn=>btn.addEventListener("click",()=>{
  mode=btn.dataset.mode;document.querySelectorAll(".mode-button").forEach(b=>b.classList.toggle("active",b===btn));renderStory();
}));
$("previousPage").addEventListener("click",()=>{if(page>0){page--;renderStory();}});
$("nextPage").addEventListener("click",()=>{if(page<storyPages.length-1){page++;renderStory();}else{showToast("Wonderful reading! You finished the story. 🌟");page=0;renderStory();}});
$("smallerText").addEventListener("click",()=>{fontSize=Math.max(16,fontSize-1);renderStory();});
$("largerText").addEventListener("click",()=>{fontSize=Math.min(28,fontSize+1);renderStory();});
$("closeWord").addEventListener("click",()=>$("wordPanel").hidden=true);
$("readAloud").addEventListener("click",()=>{
  if(!("speechSynthesis" in window)){showToast("Read-aloud is not available in this browser.");return;}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(storyPages[page].paragraphs.join(" "));
  utterance.lang="en-GB";utterance.rate=.82;window.speechSynthesis.speak(utterance);
});
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);}
function navigate(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  const target=$(view+"View");if(target)target.classList.add("active");
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  document.querySelector(".main-nav").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.view)));
document.querySelectorAll("[data-go]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.go)));
$("mobileMenu").addEventListener("click",()=>document.querySelector(".main-nav").classList.toggle("open"));
$("parentButton").addEventListener("click",()=>$("parentModal").hidden=false);
$("closeModal").addEventListener("click",()=>$("parentModal").hidden=true);
$("gotIt").addEventListener("click",()=>$("parentModal").hidden=true);
$("speechStart").addEventListener("click",()=>showToast("Start with the speech starter below. You can do it! 🎤"));
$("copyPrompt").addEventListener("click",async()=>{
  const text="Good morning, everyone. Today I would like to talk about kindness. I think kindness is important because…";
  try{await navigator.clipboard.writeText(text);showToast("Speech starter copied!");}catch(e){showToast("Select and copy the speech starter above.");}
});
renderStory();

// Editorial QA: every token is classified as reviewed syllables, known one-syllable,
// or REVIEW. Possessives are checked against their base word without losing the suffix.
window.littleLanternsQA={
  inspect(text){
    return text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)?.map(word=>{
      const info=tokenInfo(word);
      return {word,syllables:info.parts?info.parts.join("-")+(info.possessive?"'s":""):info.isKnownOne?"1":null,status:info.known?"reviewed":"REVIEW"};
    })||[];
  },
  storyAudit(){
    return storyPages.flatMap((p,i)=>p.paragraphs.flatMap(t=>this.inspect(t).map(w=>({...w,page:i+1}))));
  },
  annotations:syllables
};