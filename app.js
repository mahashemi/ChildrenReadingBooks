const storyPages = [
  {
    title: "A Special Dream",
    paragraphs: [
      "Long ago, there lived a kind boy named Yusuf. He loved his father, Yaqub, very much.",
      "One night, Yusuf had a wonderful dream. He saw eleven stars, the sun, and the moon. They seemed to bow before him.",
      "In the morning, he went to his father. He told him about his dream with excitement."
    ]
  },
  {
    title: "A Father's Loving Advice",
    paragraphs: [
      "Yusuf's father listened very carefully. He was a wise and loving father. He understood that the dream was special.",
      "He told Yusuf to keep his dream a secret from his brothers. He did not want them to feel jealous or unhappy.",
      "His father also told him that Allah had chosen him for something special. He would teach him to understand things that others could not.",
      "Yusuf listened to his father. He knew that his father loved him and wanted the best for him.",
      "He decided to follow his father's advice. He felt peaceful and safe."
    ]
  },
  {
    title: "A Lesson to Remember",
    paragraphs: [
      "Yusuf remembered his father's words. He knew that some dreams and important matters should be shared with care.",
      "He continued to grow with patience and trust in Allah. His life would bring many challenges, but he would learn to remain truthful and hopeful.",
      "The story of Yusuf teaches us that Allah knows what we cannot see. It also reminds us to listen to wise advice, be patient, and keep our hearts close to what is good."
    ]
  }
];

// Reviewed teaching annotations. The source spelling is never changed.
// Add every eligible multisyllabic word here after checking pronunciation.
const syllables = {
  long: ["long"], ago: ["a", "go"], lived: ["lived"], kind: ["kind"],
  boy: ["boy"], named: ["named"], Yusuf: ["Yu", "suf"], loved: ["loved"],
  father: ["fa", "ther"], Yaqub: ["Ya", "qub"], very: ["ver", "y"],
  much: ["much"], one: ["one"], night: ["night"], had: ["had"],
  wonderful: ["won", "der", "ful"], dream: ["dream"], eleven: ["e", "lev", "en"],
  stars: ["stars"], sun: ["sun"], moon: ["moon"], they: ["they"],
  seemed: ["seemed"], bow: ["bow"], before: ["be", "fore"], in: ["in"],
  the: ["the"], morning: ["morn", "ing"], went: ["went"], to: ["to"],
  his: ["his"], told: ["told"], him: ["him"], about: ["a", "bout"],
  with: ["with"], excitement: ["ex", "cite", "ment"], listened: ["lis", "tened"],
  carefully: ["care", "ful", "ly"], was: ["was"], a: ["a"], wise: ["wise"],
  and: ["and"], loving: ["lov", "ing"], understood: ["un", "der", "stood"],
  that: ["that"], special: ["spe", "cial"], he: ["he"], keep: ["keep"],
  secret: ["se", "cret"], from: ["from"], brothers: ["broth", "ers"],
  did: ["did"], not: ["not"], want: ["want"], them: ["them"], feel: ["feel"],
  jealous: ["jeal", "ous"], or: ["or"], unhappy: ["un", "hap", "py"],
  also: ["al", "so"], chosen: ["cho", "sen"], for: ["for"], something: ["some", "thing"],
  teach: ["teach"], understand: ["un", "der", "stand"], things: ["things"],
  others: ["oth", "ers"], could: ["could"], listen: ["lis", "ten"],
  knew: ["knew"], wanted: ["want", "ed"], best: ["best"], decided: ["de", "cid", "ed"],
  follow: ["fol", "low"], advice: ["ad", "vice"], peaceful: ["peace", "ful"],
  safe: ["safe"], remembered: ["re", "mem", "bered"], words: ["words"],
  important: ["im", "por", "tant"], matters: ["mat", "ters"], should: ["should"],
  shared: ["shared"], care: ["care"], continued: ["con", "tin", "ued"],
  grow: ["grow"], patience: ["pa", "tience"], trust: ["trust"], Allah: ["Al", "lah"],
  life: ["life"], would: ["would"], bring: ["bring"], many: ["man", "y"],
  challenges: ["chal", "leng", "es"], learn: ["learn"], remain: ["re", "main"],
  truthful: ["truth", "ful"], hopeful: ["hope", "ful"], story: ["sto", "ry"],
  teaches: ["teach", "es"], knows: ["knows"], what: ["what"], we: ["we"],
  cannot: ["can", "not"], see: ["see"], reminds: ["re", "minds"],
  wise: ["wise"], hearts: ["hearts"], close: ["close"], good: ["good"]
};
const meanings = {
  wonderful:"Very special or amazing.", excitement:"A feeling of happiness and eagerness.",
  carefully:"With attention and care.", understood:"Knew the meaning of something.",
  secret:"Something kept private.", jealous:"Feeling unhappy because someone has something you want.",
  peaceful:"Calm, quiet and without worry.", advice:"A helpful suggestion about what to do.",
  patience:"Staying calm while waiting or facing difficulty.", truthful:"Honest; telling what is true."
};
let page = 0;
let mode = "syllables";
let fontSize = 19;
const $ = (id) => document.getElementById(id);
const storyText = $("storyText");

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function findAnnotation(word) {
  const clean = word.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
  if (!clean) return null;
  return syllables[clean] || syllables[clean.toLowerCase()] || null;
}
function renderParagraph(paragraph) {
  const pieces = paragraph.split(/(\s+)/);
  return pieces.map(piece => {
    if (/^\s+$/.test(piece)) return piece;
    const clean = piece.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    const parts = findAnnotation(piece);
    const isMulti = parts && parts.length > 1;
    const shouldBreak = mode === "syllables" ? isMulti : mode === "mixed" ? (isMulti && clean.length >= 7) : false;
    const shown = shouldBreak ? parts.join("-") : clean;
    if (!clean) return escapeHtml(piece);
    const before = piece.slice(0, piece.indexOf(clean));
    const after = piece.slice(piece.indexOf(clean) + clean.length);
    const className = shouldBreak ? (mode === "mixed" ? "mixed-word" : "syllabified") : "";
    const annotation = parts ? parts.join("-") : "Not yet annotated";
    const meaning = meanings[clean] || meanings[clean.toLowerCase()] || "Explore this word in the story. Its pronunciation and meaning can be added to the vocabulary guide.";
    return escapeHtml(before) + '<span class="story-word '+className+'" tabindex="0" role="button" data-word="'+escapeHtml(clean)+'" data-parts="'+escapeHtml(annotation)+'" data-meaning="'+escapeHtml(meaning)+'" aria-label="'+escapeHtml(clean)+'">'+escapeHtml(shown)+'</span>' + escapeHtml(after);
  }).join("");
}
function renderStory() {
  const current = storyPages[page];
  $("storyTitle").textContent = current.title;
  $("pageCount").textContent = "PAGE " + (page + 1) + " OF " + storyPages.length;
  storyText.style.fontSize = fontSize + "px";
  storyText.innerHTML = current.paragraphs.map(p => "<p>"+renderParagraph(p)+"</p>").join("");
  $("previousPage").disabled = page === 0;
  $("nextPage").textContent = page === storyPages.length - 1 ? "Finish story ✓" : "Next page →";
  $("progressDots").innerHTML = storyPages.map((_,i)=>'<i class="'+(i===page?'on':'')+'"></i>').join("");
  $("wordPanel").hidden = true;
  $("modeHint").textContent = mode === "syllables" ? "All reviewed multisyllabic words are divided into syllables. Tap any word to explore it." : mode === "mixed" ? "Longer reviewed words are divided; shorter and familiar words stay whole." : "Read the story in ordinary English spelling. Tap any word to explore it.";
}
function selectWord(target) {
  const word = target.dataset.word;
  $("wordDisplay").textContent = word;
  $("wordBreakdown").textContent = target.dataset.parts === "Not yet annotated" ? "Syllable review pending" : target.dataset.parts;
  $("wordMeaning").textContent = target.dataset.meaning;
  $("wordPanel").hidden = false;
}
storyText.addEventListener("click", e => { const word=e.target.closest(".story-word"); if(word) selectWord(word); });
storyText.addEventListener("keydown", e => { if((e.key==="Enter"||e.key===" ") && e.target.classList.contains("story-word")){e.preventDefault();selectWord(e.target);} });
document.querySelectorAll(".mode-button").forEach(btn=>btn.addEventListener("click",()=>{
  mode=btn.dataset.mode;
  document.querySelectorAll(".mode-button").forEach(b=>b.classList.toggle("active",b===btn));
  renderStory();
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
  utterance.lang="en-GB";utterance.rate=.82;
  window.speechSynthesis.speak(utterance);
});
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);}
function navigate(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  const target=$(view+"View");if(target)target.classList.add("active");
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  document.querySelector(".main-nav").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
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

// Syllable QA helper: exposes annotation coverage for editorial checks in the browser console.
window.littleLanternsQA = {
  annotations: syllables,
  inspect(text) {
    return text.match(/[A-Za-z]+/g)?.map(word=>({word,syllables:findAnnotation(word),status:findAnnotation(word)?"annotated":"REVIEW"})) || [];
  },
  storyAudit() {
    return storyPages.flatMap((p,i)=>p.paragraphs.flatMap(t=>this.inspect(t).map(w=>({...w,page:i+1}))));
  }
};