const storyPages = [
  { title:"A Special Dream", paragraphs:[
    "Long ago, there lived a kind boy named Yusuf. He loved his father, Yaqub, very much.",
    "One night, Yusuf had a wonderful dream. He saw eleven stars, the sun, and the moon. They seemed to bow before him.",
    "In the morning, he went to his father. He told him about his dream with excitement."
  ]},
  { title:"A Father's Loving Advice", paragraphs:[
    "Yusuf's father listened very carefully. He was a wise and loving father. He understood that the dream was special.",
    "He warned Yusuf not to tell his brothers about the dream. He feared they might make a harmful plan against him.",
    "He reminded Yusuf that Shaytan is an enemy to people. He also told him that Allah would teach him the meaning of dreams.",
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
  about:["a","bout"], advice:["ad","vice"], against:["a","gainst"], ago:["a","go"], allah:["Al","lah"],
  also:["al","so"], before:["be","fore"], brothers:["broth","ers"],
  carefully:["care","ful","ly"], cannot:["can","not"], challenges:["chal","len","ges"],
  chosen:["cho","sen"], continued:["con","tin","ued"], decided:["de","cid","ed"], enemy:["en","e","my"],
  eleven:["e","lev","en"], excitement:["ex","cite","ment"], father:["fa","ther"],
  follow:["fol","low"], hopeful:["hope","ful"], harmful:["harm","ful"], important:["im","por","tant"],
  jealous:["jeal","ous"], listened:["lis","tened"], listen:["lis","ten"],
  loving:["lov","ing"], many:["man","y"], matters:["mat","ters"],
  meaning:["mean","ing"], morning:["morn","ing"], others:["oth","ers"], patience:["pa","tience"], people:["peo","ple"],
  patient:["pa","tient"], peaceful:["peace","ful"], remain:["re","main"],
  remembered:["re","mem","bered"], reminded:["re","mind","ed"], reminds:["re","minds"], secret:["se","cret"], shaytan:["Shay","tan"],
  special:["spe","cial"], story:["sto","ry"], something:["some","thing"],
  teaches:["teach","es"], truthful:["truth","ful"], understand:["un","der","stand"],
  understood:["un","der","stood"], unhappy:["un","hap","py"], wanted:["want","ed"],
  very:["ver","y"], wonderful:["won","der","ful"], yusuf:["Yu","suf"], yaqub:["Ya","qub"]
};
const oneSyllable = new Set((
  "a an and be best bow boy bring but care close could did dream dreams feared feel felt for from good grow had he hearts him his in is it keep kind knew knows learn life lived long loved make might named night not of one or our plan safe saw see seemed shared should some stars sun teach tell that the them there they things to told trust us warned was we went what with wise words would"
).split(/\s+/).filter(Boolean));
const soundGuides = {
  lived: "Short i, as in sit; finish with a d sound.",
  loved: "Short u, as in sun; finish with a d sound.",
  feared: "The vowel sounds like ear in hear; finish with d.",
  seemed: "Hold the ee sound, then finish with d.",
  named: "The a says its name; finish with d.",
  warned: "The vowel sounds like or; finish with d.",
  helped: "The ending is a t sound.",
  asked: "The ending is a t sound.",
  shared: "The vowel sounds like air; finish with d.",
  listened: "The -ed ending sounds like d; it does not add a syllable.",
  wanted: "Here, -ed sounds like id and adds a syllable.",
  decided: "The -ed ending sounds like id and adds a syllable.",
  reminded: "The -ed ending sounds like id and adds a syllable.",
  remembered: "The -ed ending sounds like id and adds a syllable."
};
const meanings = {
  wonderful:"Very special or amazing.", excitement:"A happy, eager feeling when something important happens.",
  carefully:"With attention, so you do something thoughtfully.", understood:"Knew what something meant.",
  secret:"Something kept private.", jealous:"Feeling upset because someone else has something you wish you had.",
  peaceful:"Calm inside, with no worry or fighting.", advice:"A helpful idea that guides what you should do.",
  patience:"Staying calm while you wait or face something difficult.", truthful:"Honest; saying what is true.",
  about:"On the subject of something.", against:"In opposition to something.", ago:"A time before now.",
  also:"In addition.", before:"Earlier than a particular time.", brothers:"Boys or men who share the same parent or parents.",
  challenges:"Difficult things that test your effort.", continued:"Kept doing something; did not stop.", decided:"Made a choice after thinking.",
  enemy:"Someone or something that tries to harm you.", eleven:"The number after ten.", father:"A male parent; a dad.",
  follow:"To do what someone advises, or go after them.", hopeful:"Feeling that something good may happen.",
  harmful:"Able to hurt or cause damage.", important:"Something that matters a lot.", listened:"Paid attention to what someone said.",
  listen:"To use your ears and pay attention.", loving:"Showing care, kindness and affection.", matters:"Things or subjects that are important.",
  meaning:"What a word, action or message tells us.", morning:"The early part of the day, after night.", people:"Human beings; men, women and children.",
  patient:"Able to wait calmly.", remain:"To stay; to continue being in a state.", remembered:"Kept something in your mind from before.",
  reminds:"Helps someone remember.", shaytan:"The name used in Islam for Satan, who tempts people to do wrong.",
  special:"Different from ordinary things in an important way.", story:"A telling of events, real or imagined.", teaches:"Helps someone learn.",
  understand:"To know what something means.", wanted:"Wished for or hoped to have something.", very:"To a great degree.",
  yusuf:"Prophet Yusuf (Joseph), whose story is told in the Qur'an.", yaqub:"Prophet Yaqub (Jacob), the father of Prophet Yusuf.",
  allah:"The Arabic name for God, the One worthy of worship.", dream:"Pictures or events your mind experiences while you sleep.",
  stars:"Tiny-looking points of light in the night sky; huge suns far away.", sun:"The star that gives Earth light and warmth.",
  moon:"The bright object we see at night; it travels around Earth.", bow:"To bend your head or body forward to show respect.",
  warned:"Told someone about danger so they could be careful.", feared:"Felt afraid that something bad might happen.",
  plan:"An idea about what someone intends to do.", safe:"Free from danger or harm.", wise:"Good at making thoughtful choices.",
  kind:"Caring and gentle toward others.", trust:"To feel sure that someone is good, honest or reliable.",
  life:"The time during which a person is alive.", grow:"To become bigger, older or more developed.",
  shared:"Gave or told something to another person.", care:"Kind attention; looking after someone or something.",
  best:"The very finest or most helpful.", words:"Things we say or write; parts of language.", night:"The dark part of each day when the sun is not visible."
};
Object.assign(meanings, {
  long:"Lasting for a lot of time, or measuring a great distance.",
  lived:"Stayed in a place; made a home there.", boy:"A male child.",
  named:"Gave someone or something a name.", saw:"Looked at something with your eyes.",
  seemed:"Looked or felt as if something were true.", told:"Said something to another person.",
  went:"Moved from one place to another.", might:"Could possibly happen.",
  make:"To create or do something.", feared:"Was afraid that something bad might happen.",
  reminded:"Helped someone remember something.", knew:"Already understood or had information.",
  felt:"Had a feeling or emotion.", decided:"Made a choice after thinking.",
  some:"A number or amount, but not all.", dreams:"Pictures and events your mind experiences while you sleep.",
  bring:"To carry or take something with you.", lesson:"Something useful that we learn.",
  cannot:"Are not able to do something.", see:"To notice something with your eyes.",
  keep:"To continue having or doing something.", hearts:"The organs in our chests; also a word for our feelings.",
  close:"Near to someone or something.", good:"Kind, helpful, or right.",
  there:"In that place.", what:"A word used to ask about a thing or idea.",
  be:"To exist or have a particular state.", is:"A word that tells what someone or something is.",
  was:"The past form of 'is' or 'am'.", had:"Owned, held, or experienced something in the past.",
  his:"Belonging to a boy or man.", him:"A word used when talking about a boy or man.",
  he:"A word used instead of a boy's or man's name.", it:"A word used for a thing or animal.",
  they:"A word used for two or more people or things.", us:"A word meaning 'you and me' or 'our group'.",
  we:"A word meaning 'you and me' or 'our group'.", our:"Belonging to us.",
  an:"A word used before a word that begins with a vowel sound.",
  a:"A word used before one person or thing.", the:"A word used for a particular person or thing.",
  and:"A word that joins words or ideas.", but:"A word that shows a difference between two ideas.",
  not:"A word that makes a statement negative.", in:"Inside or within something.",
  of:"A word that shows belonging or connection.", to:"A word that can show direction or purpose.",
  for:"A word that can show who receives or benefits from something.",
  would:"A word used to talk about what may happen in a situation.",
  should:"A word used to say what is a good or right thing to do.",
  learn:"To get knowledge or a new skill.", tell:"To say something or give information.",
  are:"A word used to describe people or things now.", one:"The number 1; a single person or thing."
});
Object.assign(meanings, {
  knows:"Has learned or understands something.",
  loved:"Cared for someone very much.",
  many:"A large number of people or things.",
  much:"A large amount.",
  remember:"To keep something in your mind, or bring it back to your mind.",
  that:"A word used to point to a particular person, thing, or idea.",
  with:"Together with; having or using something.",
  teach:"To help someone learn.",
  title:"The name of a story, book, or piece of writing."
});
let page=0, mode="syllables", fontSize=19;
const $=id=>document.getElementById(id);
const storyText=$("storyText");
function escapeHtml(value){return value.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function suggestedSyllables(word){
  const w=word.toLowerCase();
  if(w.length<5)return null;
  if(/(t|d)ed$/.test(w))return [w.slice(0,-2),"ed"];
  if(/(s|x|z|ch|sh)es$/.test(w))return [w.slice(0,-2),"es"];
  const suffixes=["ation","ition","ment","ness","less","ful","able","ible","ing","er","est","ly","ous","ive"];
  for(const suffix of suffixes){if(w.endsWith(suffix)&&w.length>suffix.length+2)return [w.slice(0,-suffix.length),suffix];}
  const nuclei=[...w.matchAll(/[aeiouy]+/g)].map(m=>({start:m.index,end:m.index+m[0].length}));
  if(nuclei.length<2)return null;
  const cuts=[];for(let i=0;i<nuclei.length-1;i++){const a=nuclei[i],b=nuclei[i+1],gap=w.slice(a.end,b.start);cuts.push(gap.length>=2?b.start-1:a.end);}
  const out=[];let start=0;for(const cut of cuts){if(cut>start){out.push(w.slice(start,cut));start=cut;}}out.push(w.slice(start));
  return out.length>1?out:null;
}

function tokenInfo(token){
  const match=token.match(/[A-Za-z]+(?:'[A-Za-z]+)?/);
  if(!match)return null;
  const original=match[0], possessive=/'s$/i.test(original);
  const base=possessive?original.slice(0,-2):original;
  const reviewed=syllables[base.toLowerCase()]||null;
  const parts=reviewed||(!oneSyllable.has(base.toLowerCase())?suggestedSyllables(base):null);
  const isKnownOne=oneSyllable.has(base.toLowerCase());
  return {original,base,possessive,parts,isKnownOne,reviewed:!!reviewed,known:!!reviewed||isKnownOne};
}
function renderParagraph(paragraph){
  return paragraph.split(/(\s+)/).map(piece=>{
    if(/^\s+$/.test(piece))return piece;
    const info=tokenInfo(piece);
    if(!info)return escapeHtml(piece);
    const {original,base,possessive,parts,known,isKnownOne,reviewed}=info;
    const before=piece.slice(0,piece.indexOf(original));
    const after=piece.slice(piece.indexOf(original)+original.length);
    const isMulti=!!parts&&parts.length>1;
    const shouldBreak=mode==="syllables"?isMulti:mode==="mixed"?(isMulti&&base.length>=6):false;
    const shown=shouldBreak?parts.join("-")+(possessive?"'s":""):original;
    const breakdown=parts?parts.join("-")+(possessive?"'s":"")+(soundGuides[base.toLowerCase()]?" · "+soundGuides[base.toLowerCase()]:""):soundGuides[base.toLowerCase()]||"";
    const meaning=meanings[base.toLowerCase()]||"Meaning not added yet.";
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
  $("modeHint").textContent=mode==="syllables"?"Multisyllabic words are divided. Tap any word to hear it and see what it means.":mode==="mixed"?"Longer words are divided; shorter words stay whole. Tap any word to hear it and see what it means.":"Read in ordinary English spelling. Tap a word to hear it and see what it means.";
}
function selectWord(target){
  if(isReadingStory)stopReading();
  $("wordDisplay").textContent=target.dataset.word;
  $("wordBreakdown").textContent=target.dataset.parts;
  $("wordMeaning").textContent=target.dataset.meaning;
  $("wordPanel").hidden=false;
  speakText(target.dataset.word);
}
storyText.addEventListener("click",e=>{const word=e.target.closest(".story-word");if(word)selectWord(word);});
storyText.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("story-word")){e.preventDefault();selectWord(e.target);}});
document.querySelectorAll(".mode-button").forEach(btn=>btn.addEventListener("click",()=>{
  if(isReadingStory)stopReading();mode=btn.dataset.mode;document.querySelectorAll(".mode-button").forEach(b=>b.classList.toggle("active",b===btn));renderStory();
}));
$("previousPage").addEventListener("click",()=>{if(isReadingStory)stopReading();if(page>0){page--;renderStory();}});
$("nextPage").addEventListener("click",()=>{if(isReadingStory)stopReading();if(page<storyPages.length-1){page++;renderStory();}else{showToast("Wonderful reading! You finished the story. 🌟");page=0;renderStory();}});
$("smallerText").addEventListener("click",()=>{fontSize=Math.max(16,fontSize-1);renderStory();});
$("largerText").addEventListener("click",()=>{fontSize=Math.min(28,fontSize+1);renderStory();});
$("closeWord").addEventListener("click",()=>$("wordPanel").hidden=true);
$("hearMeaning").addEventListener("click",()=>speakText($("wordMeaning").textContent));

let speechRate=1, storyReadToken=0, isReadingStory=false, currentSpeechParagraph=0;
function updateSpeechRate(){
  $("speechRate").textContent=speechRate.toFixed(1)+"×";
}
function clearSpeechHighlight(){
  storyText.querySelectorAll(".is-speaking,.is-speaking-paragraph").forEach(el=>el.classList.remove("is-speaking","is-speaking-paragraph"));
}
function stopReading(){
  storyReadToken++;
  isReadingStory=false;
  if("speechSynthesis" in window)window.speechSynthesis.cancel();
  clearSpeechHighlight();
  $("readAloud").textContent="🔊 Listen";
  $("readAloud").setAttribute("title","Read this page aloud");
}
function speakText(text){
  if(!("speechSynthesis" in window)){showToast("Audio is not available in this browser.");return;}
  if(isReadingStory)stopReading();
  window.speechSynthesis.cancel();
  const cleanText=String(text).replace(/\s+/g," ").trim();
  const utterance=new SpeechSynthesisUtterance(cleanText);
  utterance.rate=speechRate;
  // Voice and language remain unset: the browser chooses its own default voice.
  window.speechSynthesis.speak(utterance);
}
function highlightSpokenWord(paragraphIndex,charIndex){
  clearSpeechHighlight();
  const paragraph=storyPages[page].paragraphs[paragraphIndex];
  const tokens=[...paragraph.matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)];
  const tokenIndex=tokens.findIndex(match=>charIndex>=match.index&&charIndex<match.index+match[0].length);
  const paragraphNode=storyText.children[paragraphIndex];
  if(!paragraphNode)return;
  paragraphNode.classList.add("is-speaking-paragraph");
  if(tokenIndex<0)return;
  const wordNodes=paragraphNode.querySelectorAll(".story-word");
  const active=wordNodes[tokenIndex];
  if(active)active.classList.add("is-speaking");
}
function speakStoryParagraph(token,paragraphIndex){
  if(token!==storyReadToken||!isReadingStory)return;
  const paragraphs=storyPages[page].paragraphs;
  if(paragraphIndex>=paragraphs.length){
    isReadingStory=false;
    clearSpeechHighlight();
    $("readAloud").textContent="🔊 Listen";
    $("readAloud").setAttribute("title","Read this page aloud");
    return;
  }
  currentSpeechParagraph=paragraphIndex;
  const paragraphText=paragraphs[paragraphIndex];
  const utterance=new SpeechSynthesisUtterance(paragraphText);
  utterance.rate=speechRate;
  // Do not set voice or language; allow the browser to choose its default.
  utterance.onboundary=event=>{
    if(token!==storyReadToken||!isReadingStory)return;
    if(typeof event.charIndex==="number")highlightSpokenWord(paragraphIndex,event.charIndex);
  };
  utterance.onend=()=>speakStoryParagraph(token,paragraphIndex+1);
  utterance.onerror=event=>{
    if(token!==storyReadToken)return;
    isReadingStory=false;
    clearSpeechHighlight();
    $("readAloud").textContent="🔊 Listen";
    if(event.error!=="canceled"&&event.error!=="interrupted")showToast("The reader could not finish speaking.");
  };
  window.speechSynthesis.speak(utterance);
}
function startStoryReading(){
  if(!("speechSynthesis" in window)){showToast("Audio is not available in this browser.");return;}
  window.speechSynthesis.cancel();
  clearSpeechHighlight();
  storyReadToken++;
  isReadingStory=true;
  currentSpeechParagraph=0;
  $("readAloud").textContent="⏹ Stop";
  $("readAloud").setAttribute("title","Stop reading");
  speakStoryParagraph(storyReadToken,0);
}
$("readAloud").addEventListener("click",()=>isReadingStory?stopReading():startStoryReading());
$("slowerSpeech").addEventListener("click",()=>{
  speechRate=Math.max(.3,Math.round((speechRate-.1)*10)/10);
  updateSpeechRate();
  if(isReadingStory){const token=++storyReadToken;window.speechSynthesis.cancel();speakStoryParagraph(token,currentSpeechParagraph);}
});
$("fasterSpeech").addEventListener("click",()=>{
  speechRate=Math.min(1.5,Math.round((speechRate+.1)*10)/10);
  updateSpeechRate();
  if(isReadingStory){const token=++storyReadToken;window.speechSynthesis.cancel();speakStoryParagraph(token,currentSpeechParagraph);}
});
updateSpeechRate();
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
      return {word,syllables:info.parts?info.parts.join("-")+(info.possessive?"'s":""):info.isKnownOne?"1":null,status:info.reviewed||info.isKnownOne?"reviewed":info.parts?"suggested — check pronunciation":"REVIEW"};
    })||[];
  },
  storyAudit(){
    return storyPages.flatMap((p,i)=>p.paragraphs.flatMap(t=>this.inspect(t).map(w=>({...w,page:i+1}))));
  },
  annotations:syllables
};