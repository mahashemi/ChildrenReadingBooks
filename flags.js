/* Little Lanterns — flag learning games */
(function(){
"use strict";
const entries=(window.LITTLE_LANTERNS_FLAGS||[]).map(x=>Object.assign({},x));
const $=id=>document.getElementById(id);
const countries=entries.filter(x=>x.status==="country");
const extras=entries.filter(x=>x.status!=="country");
const storageKey="littleLanterns.flagProgress.v1";
const gridColumnsKey="littleLanterns.flagGridColumns.v1";
let gridColumns=5;
try{const savedColumns=Number(localStorage.getItem(gridColumnsKey));if([3,4,5].includes(savedColumns))gridColumns=savedColumns;}catch(e){}
let progress={seen:[],known:[],clicks:0,rounds:0,correct:0};
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"null");if(saved&&Array.isArray(saved.seen)&&Array.isArray(saved.known))progress=Object.assign(progress,saved);}catch(e){}
const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(progress));}catch(e){}};
const addUnique=(a,x)=>{if(!a.includes(x))a.push(x);};
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function emoji(code){if(code==="XK")return "🇽🇰";if(!/^[A-Z]{2}$/.test(code))return "🏳️";return String.fromCodePoint(...Array.from(code).map(c=>127397+c.charCodeAt(0)));}
const syllables={
DZ:"Al-ge-ri-a",AO:"An-go-la",BJ:"Be-nin",BW:"Bot-swa-na",BF:"Bur-ki-na Fa-so",BI:"Bu-run-di",CV:"Ca-bo Verde",CM:"Cam-er-oon",CF:"Cen-tral Af-ri-can Re-pub-lic",KM:"Com-o-ros",CG:"Re-pub-lic of the Con-go",CD:"Dem-o-crat-ic Re-pub-lic of the Con-go",CI:"Côte d’I-voire",DJ:"Dji-bou-ti",EG:"E-gypt",GQ:"E-qua-to-ri-al Guin-e-a",ER:"Er-i-tre-a",SZ:"Es-wa-ti-ni",ET:"E-thi-o-pi-a",GA:"Ga-bon",GM:"The Gam-bi-a",GH:"Gha-na",GN:"Guin-e-a",GW:"Guin-e-a Bis-sau",KE:"Ken-ya",LS:"Le-so-tho",LR:"Li-be-ri-a",LY:"Lib-ya",MG:"Mad-a-gas-car",MW:"Ma-la-wi",ML:"Ma-li",MR:"Mau-ri-ta-ni-a",MU:"Mau-ri-tius",MA:"Mo-roc-co",MZ:"Mo-zam-bique",NA:"Na-mi-bi-a",NE:"Ni-ger",NG:"Ni-ge-ri-a",RW:"Rwan-da",ST:"São Tomé and Prín-ci-pe",SN:"Sen-e-gal",SC:"Sey-chelles",SL:"Si-er-ra Le-one",SO:"So-ma-li-a",ZA:"South Af-ri-ca",SS:"South Su-dan",SD:"Su-dan",TZ:"Tan-za-ni-a",TG:"To-go",TN:"Tu-ni-sia",UG:"U-gan-da",ZM:"Zam-bi-a",ZW:"Zim-bab-we",
AF:"Af-ghan-i-stan",AM:"Ar-me-ni-a",AZ:"A-zer-bai-jan",BH:"Bah-rain",BD:"Bang-la-desh",BT:"Bhu-tan",BN:"Bru-nei",KH:"Cam-bo-di-a",CN:"Chi-na",CY:"Cy-prus",GE:"Geor-gi-a",IN:"In-di-a",ID:"In-do-ne-sia",IR:"I-ran",IQ:"I-raq",IL:"Is-ra-el",JP:"Ja-pan",JO:"Jor-dan",KZ:"Ka-zakh-stan",KW:"Ku-wait",KG:"Kyr-gyz-stan",LA:"La-os",LB:"Leb-a-non",MY:"Ma-lay-sia",MV:"Mal-dives",MN:"Mon-go-li-a",MM:"My-an-mar",NP:"Ne-pal",KP:"North Ko-re-a",OM:"O-man",PK:"Pak-i-stan",PS:"Pal-es-tine",PH:"Phil-ip-pines",QA:"Qa-tar",SA:"Sau-di A-ra-bi-a",SG:"Sing-a-pore",KR:"South Ko-re-a",LK:"Sri Lan-ka",SY:"Syr-i-a",TJ:"Ta-jik-i-stan",TH:"Thai-land",TL:"Ti-mor-Les-te",TR:"Tür-ki-ye",TM:"Turk-men-i-stan",AE:"Unit-ed Ar-ab Em-ir-ates",UZ:"Uz-be-kis-tan",VN:"Viet-nam",YE:"Yem-en",
AL:"Al-ba-ni-a",AD:"An-dor-ra",AT:"Aus-tri-a",BY:"Bel-a-rus",BE:"Bel-gium",BA:"Bos-ni-a and Her-ze-go-vi-na",BG:"Bul-gar-i-a",HR:"Cro-a-ti-a",CZ:"Czech-i-a",DK:"Den-mark",EE:"Es-to-ni-a",FI:"Fin-land",FR:"France",DE:"Ger-ma-ny",GR:"Greece",HU:"Hun-ga-ry",IS:"Ice-land",IE:"Ire-land",IT:"It-a-ly",LV:"Lat-vi-a",LI:"Liech-ten-stein",LT:"Lith-u-a-ni-a",LU:"Lux-em-bourg",MT:"Mal-ta",MD:"Mol-do-va",MC:"Mon-a-co",ME:"Mon-te-ne-gro",NL:"Neth-er-lands",MK:"North Mac-e-do-ni-a",NO:"Nor-way",PL:"Po-land",PT:"Por-tu-gal",RO:"Ro-ma-ni-a",RU:"Rus-sia",SM:"San Ma-ri-no",RS:"Ser-bi-a",SK:"Slo-va-ki-a",SI:"Slo-ve-ni-a",ES:"Spain",SE:"Swe-den",CH:"Switz-er-land",UA:"U-kraine",GB:"Unit-ed King-dom",VA:"Vat-i-can Cit-y",
AG:"An-ti-gua and Bar-bu-da",BS:"The Ba-ha-mas",BB:"Bar-ba-dos",BZ:"Be-lize",CA:"Can-a-da",CR:"Cos-ta Ri-ca",CU:"Cu-ba",DM:"Dom-i-ni-ca",DO:"Do-min-i-can Re-pub-lic",SV:"El Sal-va-dor",GD:"Gre-na-da",GT:"Gua-te-ma-la",HT:"Hai-ti",HN:"Hon-du-ras",JM:"Ja-mai-ca",MX:"Mex-i-co",NI:"Nic-a-ra-gua",PA:"Pan-a-ma",KN:"Saint Kitts and Ne-vis",LC:"Saint Lu-ci-a",VC:"Saint Vin-cent and the Gren-a-dines",TT:"Trin-i-dad and To-ba-go",US:"U-ni-ted States",
AR:"Ar-gen-ti-na",BO:"Bo-liv-i-a",BR:"Bra-zil",CL:"Chi-le",CO:"Co-lom-bi-a",EC:"Ec-u-a-dor",GY:"Guy-an-a",PY:"Par-a-guay",PE:"Pe-ru",SR:"Sur-i-name",UY:"U-ru-guay",VE:"Ven-e-zu-e-la",
AU:"Aus-tral-i-a",FJ:"Fi-ji",KI:"Kir-i-ba-ti",MH:"Mar-shall Is-lands",FM:"Mi-cro-ne-sia",NR:"Nau-ru",NZ:"New Zea-land",PW:"Pa-lau",PG:"Pa-pu-a New Guin-e-a",WS:"Sa-mo-a",SB:"Sol-o-mon Is-lands",TO:"Ton-ga",TV:"Tu-va-lu",VU:"Van-u-a-tu",AS:"Am-er-i-can Sa-mo-a",AI:"An-guil-la",AW:"A-ru-ba",BM:"Ber-mu-da",VG:"Brit-ish Vir-gin Is-lands",KY:"Cay-man Is-lands",CK:"Cook Is-lands",CW:"Cu-ra-çao",FO:"Far-oe Is-lands",PF:"French Pol-y-ne-sia",GL:"Green-land",GU:"Guam",HK:"Hong Kong",MO:"Ma-cao",PR:"Puer-to Ri-co",SX:"Sint Maar-ten",TC:"Turks and Cai-cos Is-lands",VI:"U-ni-ted States Vir-gin Is-lands",GI:"Gi-bral-tar",JE:"Jer-sey",GG:"Guern-sey",IM:"Isle of Man",NC:"New Cal-e-do-ni-a",MP:"North-ern Mar-i-an-a Is-lands",XK:"Ko-so-vo",TW:"Tai-wan"
};
const level=()=>$("flagGameReadingLevel").value||$("flagReadingLevel").value;
function flagMarkup(entry){
return '<img class="flag-image" src="assets/flags/'+entry.code.toLowerCase()+'.svg" alt="'+escapeHtml(entry.name)+' flag" loading="lazy"><span class="flag-emoji" hidden>'+emoji(entry.code)+'</span>';
}
document.addEventListener("error",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("flag-image")){e.target.hidden=true;if(e.target.nextElementSibling)e.target.nextElementSibling.hidden=false;}},true);
function nameHtml(entry){
const split=syllables[entry.code],mode=level();
if(mode==="confident"||!split)return '<span class="flag-name">'+escapeHtml(entry.name)+'</span>';
if(mode==="beginner")return '<span class="flag-name-syllables">'+escapeHtml(split)+'</span>';
return '<span class="flag-name-syllables">'+escapeHtml(split)+'</span><span class="flag-name-whole">'+escapeHtml(entry.name)+'</span>';
}
function speak(entry){
if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return;
window.speechSynthesis.cancel();
const u=new SpeechSynthesisUtterance(entry.name);
u.rate=Math.max(.1,Math.min(typeof speechRate==="number"?speechRate:.4,.65));
window.speechSynthesis.speak(u);
}
function updateProgress(){
$("flagSeenCount").textContent=progress.seen.length;
$("flagKnownCount").textContent=progress.known.length;
$("flagTotalCount").textContent=countries.length;
$("flagProgressSummary").textContent="You have explored "+progress.seen.filter(code=>countries.some(x=>x.code===code)).length+" of "+countries.length+" countries and marked "+progress.known.filter(code=>countries.some(x=>x.code===code)).length+" as remembered. Keep going a little each day!";
}
function seen(entry){addUnique(progress.seen,entry.code);progress.clicks++;save();updateProgress();}
function markKnown(entry){
if(progress.known.includes(entry.code))progress.known=progress.known.filter(x=>x!==entry.code);else{addUnique(progress.known,entry.code);addUnique(progress.seen,entry.code);}
save();renderLibrary();updateProgress();
}
let revealed=new Set();
function renderLibrary(){
const q=$("flagSearch").value.trim().toLowerCase(),region=$("flagContinentFilter").value;
let list=region==="territories"?extras:countries;
if(region!=="all"&&region!=="territories")list=list.filter(x=>x.continent===region);
if(q)list=list.filter(x=>x.name.toLowerCase().includes(q)||x.code.toLowerCase().includes(q));
$("flagLibraryCount").textContent=list.length+" "+(region==="territories"?"territories & special-status places":"countries");
const hide=$("flagTestMode").checked;
$("flagGridColumns").value=String(gridColumns);
$("flagLibraryGrid").style.setProperty("--flag-grid-columns",String(gridColumns));
$("flagLibraryGrid").innerHTML=list.map(entry=>{
const known=progress.known.includes(entry.code),show=!hide||revealed.has(entry.code);
const label=show?nameHtml(entry):'<span class="flag-hidden-name">Tap to reveal name</span>';
const kind=entry.status==="country"?"":' · '+(entry.status==="territory"?"territory":"special status");
return '<article class="flag-library-card '+(known?"is-known":"")+'"><button class="flag-card-open" type="button" data-code="'+entry.code+'" aria-label="Hear and reveal '+escapeHtml(entry.name)+'">'+flagMarkup(entry)+''+label+'<span class="flag-region">'+entry.continent+kind+'</span></button><button class="flag-mark-known" type="button" data-known="'+entry.code+'">'+(known?"✓ Remembered":"I know this flag")+'</button></article>';
}).join("")||'<p class="flag-empty">No countries match that search. Try another name.</p>';
}
$("flagLibraryGrid").addEventListener("click",e=>{
const known=e.target.closest("[data-known]");
if(known){const entry=entries.find(x=>x.code===known.dataset.known);if(entry)markKnown(entry);return;}
const open=e.target.closest("[data-code]");
if(open){const entry=entries.find(x=>x.code===open.dataset.code);if(!entry)return;revealed.add(entry.code);seen(entry);speak(entry);renderLibrary();}
});
$("flagSearch").addEventListener("input",renderLibrary);
$("flagContinentFilter").addEventListener("change",renderLibrary);
$("flagReadingLevel").addEventListener("change",()=>{$("flagGameReadingLevel").value=$("flagReadingLevel").value;renderLibrary();});
$("flagGameReadingLevel").addEventListener("change",()=>{$("flagReadingLevel").value=$("flagGameReadingLevel").value;renderLibrary();});
$("flagTestMode").addEventListener("change",renderLibrary);
$("flagGridColumns").addEventListener("change",()=>{const value=Number($("flagGridColumns").value);if(![3,4,5].includes(value))return;gridColumns=value;try{localStorage.setItem(gridColumnsKey,String(gridColumns));}catch(e){}renderLibrary();});

function card(entry,cls,showName){
return '<button type="button" class="'+cls+'" data-code="'+entry.code+'" aria-label="'+(showName?escapeHtml(entry.name):"Flag option")+'">'+flagMarkup(entry)+(showName?nameHtml(entry):"")+'</button>';
}
function shuffle(list){const a=list.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function source(){return $("flagGameCollection").value==="all"?entries:countries;}
function preset(which){
const p={easy:[1,5,8],medium:[3,10,5],hard:[4,15,3]}[which];
$("flagTargetCount").value=String(p[0]);$("flagPoolSize").value=String(p[1]);$("flagShowSeconds").value=String(p[2]);
}
$("easyFlagSettings").addEventListener("click",()=>preset("easy"));
$("mediumFlagSettings").addEventListener("click",()=>preset("medium"));
$("hardFlagSettings").addEventListener("click",()=>preset("hard"));
let targets=[],pool=[],selected=new Set(),timer=null,left=5,phase="ready",targetCount=3;
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function addCelebrationStyles(){
if(document.getElementById("flagCelebrationStyles"))return;
const style=document.createElement("style");style.id="flagCelebrationStyles";
style.textContent=\`
.flag-win-overlay{position:fixed;inset:0;z-index:2000;display:grid;place-items:center;padding:22px;background:rgba(16,35,27,.78);backdrop-filter:blur(7px);overflow:hidden;isolation:isolate;animation:flagOverlayIn .32s ease-out both}
.flag-win-card{position:relative;z-index:4;width:min(92vw,540px);padding:clamp(28px,5vw,48px) 26px 30px;text-align:center;border:2px solid var(--win-border,#ffe6a1);border-radius:28px;background:var(--win-bg,linear-gradient(145deg,#fffdf2,#fff4dc 58%,#f9edff));box-shadow:0 24px 90px #0006;animation:flagWinCardPop .5s cubic-bezier(.16,1,.3,1) both}
.flag-win-card .win-trophy{display:block;font-size:clamp(48px,9vw,76px);line-height:1.1;margin-bottom:12px}
.flag-win-card h2{margin:0;color:var(--win-title,#315c42);font-size:clamp(29px,6vw,44px);font-weight:1000;letter-spacing:-1.2px}
.flag-win-card p{margin:12px auto 24px;max-width:390px;color:#74664c;font-size:15px;line-height:1.65;font-weight:700}
.flag-win-score{display:inline-flex;align-items:center;gap:7px;margin:0 auto 22px;padding:8px 15px;border-radius:999px;background:#ffffffb8;border:1px solid #e9e4d2;color:#5d725d;font-weight:900;font-size:14px}
.flag-win-actions{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
.flag-win-again,.flag-win-return{min-height:48px;padding:12px 20px;border-radius:999px;font:900 14px Nunito,system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:9px;transition:transform .18s,box-shadow .18s}
.flag-win-again{border:0;background:linear-gradient(110deg,#28764c,#3e9b65);color:#fff;box-shadow:0 9px 22px #28764c45}
.flag-win-return{border:1px solid #d8dfd3;background:#fff;color:#526b56;box-shadow:0 5px 14px #344c2410}
.flag-win-again:hover,.flag-win-return:hover{transform:translateY(-2px)}
.flag-win-again:focus-visible,.flag-win-return:focus-visible{outline:4px solid #e3b84e;outline-offset:4px}
.flag-win-icon{font-size:23px;line-height:1}
.flag-fireworks,.flag-confetti,.flag-win-sparkles{position:absolute;inset:0;pointer-events:none}
.flag-fireworks{z-index:1}.flag-confetti{z-index:1}.flag-win-sparkles{z-index:2}
.flag-firework{position:absolute;left:var(--fx);top:var(--fy);width:8px;height:8px;border-radius:50%;animation:flagFirework 1.65s ease-out var(--fd) infinite}
.flag-firework i{position:absolute;left:0;top:0;width:7px;height:7px;border-radius:50%;background:var(--fc);box-shadow:0 0 9px var(--fc);animation:flagFireworkParticle 1.65s ease-out var(--fd) infinite}
.flag-confetti i{position:absolute;left:var(--cx);top:-20px;width:9px;height:15px;border-radius:3px;background:var(--cc);transform:rotate(var(--cr));animation:flagConfettiFall var(--cd) ease-in var(--delay) infinite}
.flag-win-sparkles span{position:absolute;left:var(--sx);top:var(--sy);color:#fff4b0;font-size:var(--ss);text-shadow:0 0 12px #fff,0 0 24px #ffd65e;animation:flagWinTwinkle var(--sd) ease-in-out var(--delay) infinite alternate}
.flag-win-overlay.is-perfect{--win-border:#ffe6a1;--win-bg:linear-gradient(145deg,#fffdf2,#fff0c8 58%,#f8eaff)}
.flag-win-overlay.is-great{--win-border:#bfe5c7;--win-bg:linear-gradient(145deg,#f7fff5,#e9f8e9 58%,#eef4ff)}
.flag-win-overlay.is-some{--win-border:#c9d9ef;--win-bg:linear-gradient(145deg,#fbfdff,#edf5ff 58%,#f5efff)}
.flag-win-overlay.is-zero{--win-border:#ead9b7;--win-bg:linear-gradient(145deg,#fffdf5,#fff5e8 58%,#f5f2ff)}
.flag-win-overlay.is-zero .win-trophy{filter:none}
@keyframes flagOverlayIn{from{opacity:0}to{opacity:1}}
@keyframes flagWinCardPop{0%{opacity:0;transform:scale(.62) translateY(28px)}78%{transform:scale(1.025) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes flagFirework{0%{opacity:0;transform:scale(.1)}12%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.1)}}
@keyframes flagFireworkParticle{0%{opacity:0;transform:rotate(var(--fa)) translateY(-5px) scale(.4)}18%{opacity:1}100%{opacity:0;transform:rotate(var(--fa)) translateY(var(--fr)) scale(.1)}}
@keyframes flagConfettiFall{0%{opacity:0;transform:translateY(-5vh) rotate(0)}12%{opacity:1}100%{opacity:0;transform:translateY(115vh) rotate(650deg)}}
@keyframes flagWinTwinkle{from{opacity:.25;transform:scale(.55) rotate(-20deg)}to{opacity:1;transform:scale(1.25) rotate(25deg)}}
@media(prefers-reduced-motion:reduce){.flag-win-overlay,.flag-win-card,.flag-firework,.flag-firework i,.flag-confetti i,.flag-win-sparkles span{animation:none!important}.flag-win-card{opacity:1;transform:none}}
@media(max-width:480px){.flag-win-card{padding:28px 18px 22px}.flag-win-actions{flex-direction:column}.flag-win-again,.flag-win-return{width:100%}}
\`;
document.head.appendChild(style);
}
function closeWinOverlay(){
const overlay=document.querySelector(".flag-win-overlay");if(overlay)overlay.remove();
}
function showRoundResultOverlay(hits,total,misses,perfect){
closeWinOverlay();
const ratio=total?hits/total:0;
let mood;
if(perfect)mood={key:"perfect",icon:"🏆🎆",title:"YAAAAY! PERFECT!",copy:"You remembered every single flag! What an amazing memory. You're a Flag Spotter superstar!",level:3};
else if(ratio>=.7)mood={key:"great",icon:"🌟🎉",title:"AMAZING WORK!",copy:"You spotted most of the flags! You're getting really good at this. Keep that brilliant memory growing!",level:2};
else if(hits>0)mood={key:"some",icon:"✨💪",title:"GOOD TRY!",copy:"You remembered "+hits+" flag"+(hits===1?"":"s")+". Every round helps your memory grow. Let's keep practising!",level:1};
else mood={key:"zero",icon:"🌱💛",title:"LET'S LEARN TOGETHER!",copy:"That's okay! New things take practice. Take another look at the flags and give it another try. You've got this!",level:0};
const overlay=document.createElement("div");overlay.className="flag-win-overlay is-"+mood.key;overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-labelledby","flagWinTitle");overlay.setAttribute("aria-describedby","flagWinCopy");
const sparkles=document.createElement("div");sparkles.className="flag-win-sparkles";sparkles.setAttribute("aria-hidden","true");
const symbols=["✦","✧","✨","⋆","✺","⭐"];
const sparkleCount=[8,20,32,54][mood.level];
for(let i=0;i<sparkleCount;i++){
 const sparkle=document.createElement("span");sparkle.textContent=symbols[i%symbols.length];
 sparkle.style.setProperty("--sx",(2+Math.random()*96)+"%");sparkle.style.setProperty("--sy",(3+Math.random()*94)+"%");
 sparkle.style.setProperty("--ss",(12+Math.random()*23)+"px");sparkle.style.setProperty("--sd",(0.65+Math.random()*1.1)+"s");
 sparkle.style.setProperty("--delay",(Math.random()*1.2)+"s");sparkles.appendChild(sparkle);
}
let effects=document.createElement("div");
if(mood.level===3){
 effects.className="flag-fireworks";effects.setAttribute("aria-hidden","true");
 const colors=["#ffe36e","#ff8b6b","#8ee8c1","#a9a0ff","#fff1a8","#ff9acb"];
 for(let burst=0;burst<5;burst++){
  const centerX=[12,88,50,28,73][burst],centerY=[25,30,12,72,78][burst];
  for(let p=0;p<22;p++){
   const firework=document.createElement("span");firework.className="flag-firework";
   firework.style.setProperty("--fx",centerX+"%");firework.style.setProperty("--fy",centerY+"%");
   firework.style.setProperty("--fd",(burst*.22+(p%5)*.035)+"s");
   const particle=document.createElement("i");particle.style.setProperty("--fc",colors[(p+burst)%colors.length]);
   particle.style.setProperty("--fa",(p*360/22)+"deg");particle.style.setProperty("--fr",(65+(p%4)*22)+"px");
   firework.appendChild(particle);effects.appendChild(firework);
  }
 }
}else if(mood.level===2||mood.level===1){
 effects.className="flag-confetti";effects.setAttribute("aria-hidden","true");
 const colors=["#f5c85b","#75bd8a","#8daee8","#e99ab8","#b59be8"];
 const count=mood.level===2?42:20;
 for(let i=0;i<count;i++){
  const piece=document.createElement("i");piece.style.setProperty("--cx",(Math.random()*100)+"%");
  piece.style.setProperty("--cc",colors[i%colors.length]);piece.style.setProperty("--cr",(Math.random()*180)+"deg");
  piece.style.setProperty("--cd",(2.8+Math.random()*2)+"s");piece.style.setProperty("--delay",(Math.random()*2)+"s");effects.appendChild(piece);
 }
}
const card=document.createElement("div");card.className="flag-win-card";
const extraNote=misses?" You also picked "+misses+" extra flag"+(misses===1?"":"s")+".":"";
card.innerHTML='<span class="win-trophy" aria-hidden="true">'+mood.icon+'</span><h2 id="flagWinTitle">'+mood.title+'</h2><p id="flagWinCopy">'+mood.copy+extraNote+'</p><div class="flag-win-score"><span>⭐</span><span>'+hits+' / '+total+' correct</span></div><div class="flag-win-actions"><button class="flag-win-again" type="button"><span class="flag-win-icon" aria-hidden="true">↻</span><span>Play again</span></button><button class="flag-win-return" type="button"><span class="flag-win-icon" aria-hidden="true">×</span><span>Return to game</span></button></div>';
overlay.append(effects,sparkles,card);document.body.appendChild(overlay);
const again=card.querySelector(".flag-win-again"),back=card.querySelector(".flag-win-return");
again.addEventListener("click",()=>{closeWinOverlay();startGame();});
back.addEventListener("click",()=>{closeWinOverlay();const next=$("nextFlagRound");if(next)next.focus();});
overlay.addEventListener("keydown",e=>{
 if(e.key==="Escape"){e.preventDefault();back.click();}
 if(e.key==="Tab"){
  const buttons=Array.from(overlay.querySelectorAll("button"));
  if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons[buttons.length-1].focus();}
  else if(!e.shiftKey&&document.activeElement===buttons[buttons.length-1]){e.preventDefault();buttons[0].focus();}
 }
});
again.focus();
}
function celebrateFlagWin(perfect,hits,total,misses){
addCelebrationStyles();
const old=$("flagCelebration");if(old)old.remove();
showRoundResultOverlay(hits,total,misses,perfect);
}
function updateSelection(){
$("flagSelectionCount").textContent=selected.size+" of "+targetCount+" selected";
$("checkFlagAnswers").disabled=selected.size===0;
}
function showPool(){
stopTimer();phase="choose";$("flagGamePhase").textContent="FIND THE FLAGS";
$("flagGameTitle").textContent="Which flags did you see?";
$("flagGameInstruction").textContent="Tap every flag you remember. The country name will be spoken and shown beneath each flag you select.";
$("flagGameTimer").textContent=targetCount+" to find";$("flagGameTimer").classList.remove("is-counting");$("flagTargets").innerHTML="";
$("flagPoolWrap").hidden=false;$("flagTargetBadge").textContent=targetCount+" to find";
$("flagChoicePool").innerHTML=pool.map(x=>card(x,"flag-option-card",false)).join("");
updateSelection();
}
function startGame(){
stopTimer();closeWinOverlay();const oldBanner=$("flagCelebration");if(oldBanner)oldBanner.remove();selected.clear();$("startFlagGame").hidden=true;
const list=source(),n=Math.min(Number($("flagTargetCount").value),list.length),size=Math.min(Math.max(n,Number($("flagPoolSize").value)),list.length);
targetCount=n;targets=shuffle(list).slice(0,n);targets.forEach(x=>addUnique(progress.seen,x.code));save();updateProgress();
pool=shuffle(targets.concat(shuffle(list.filter(x=>!targets.some(t=>t.code===x.code))).slice(0,size-n)));
left=Number($("flagShowSeconds").value);phase="memorise";
$("flagGamePhase").textContent="MEMORISE THESE FLAGS";$("flagGameTitle").textContent="Look carefully!";
$("flagGameInstruction").textContent="Remember all "+n+" flags. They will disappear when the timer reaches zero.";
$("flagGameTimer").textContent=left+" seconds";$("flagGameTimer").classList.add("is-counting");
$("flagTargets").innerHTML=targets.map(x=>card(x,"flag-target-card",false)).join("");
$("flagPoolWrap").hidden=true;$("flagChoicePool").innerHTML="";$("flagGameResult").textContent="";
$("nextFlagRound").hidden=true;$("checkFlagAnswers").disabled=true;$("clearFlagChoices").disabled=false;
timer=setInterval(()=>{left--; $("flagGameTimer").textContent=Math.max(0,left)+" seconds";if(left<=0)showPool();},1000);
}
$("startFlagGame").addEventListener("click",startGame);
$("flagGameCollection").addEventListener("change",()=>{$("flagTargetCount").value="3";});
$("flagTargets").addEventListener("click",e=>{
const b=e.target.closest("[data-code]");if(!b)return;
const x=targets.find(t=>t.code===b.dataset.code);if(x){seen(x);speak(x);if(!b.querySelector(".flag-name,.flag-name-syllables"))b.insertAdjacentHTML("beforeend",nameHtml(x));}
});
$("flagChoicePool").addEventListener("click",e=>{
if(phase!=="choose")return;
const b=e.target.closest("[data-code]");if(!b)return;
const x=pool.find(t=>t.code===b.dataset.code);if(!x)return;
if(selected.has(x.code)){selected.delete(x.code);b.classList.remove("selected");b.querySelectorAll(".flag-name,.flag-name-syllables,.flag-name-whole").forEach(n=>n.remove());}
else{if(selected.size>=targetCount){$("flagGameInstruction").textContent="You need "+targetCount+" flags. Remove one choice before selecting another.";return;}selected.add(x.code);b.classList.add("selected");b.insertAdjacentHTML("beforeend",nameHtml(x));seen(x);speak(x);}
updateSelection();
});
$("clearFlagChoices").addEventListener("click",()=>{
selected.clear();$("flagChoicePool").querySelectorAll(".selected").forEach(b=>{b.classList.remove("selected");b.querySelectorAll(".flag-name,.flag-name-syllables,.flag-name-whole").forEach(n=>n.remove());});updateSelection();
});
$("checkFlagAnswers").addEventListener("click",()=>{
if(phase!=="choose")return;phase="result";
const targetCodes=new Set(targets.map(x=>x.code)),hits=targets.filter(x=>selected.has(x.code)),misses=pool.filter(x=>selected.has(x.code)&&!targetCodes.has(x.code));
const perfect=hits.length===targets.length&&misses.length===0;
progress.rounds++;progress.correct+=hits.length;hits.forEach(x=>addUnique(progress.known,x.code));save();updateProgress();
$("flagGamePhase").textContent=perfect?"PERFECT MATCH!":"ROUND COMPLETE";
$("flagGameTitle").textContent=perfect?"Brilliant remembering!":"Good effort — let's learn from this round.";
$("flagGameInstruction").textContent="You found "+hits.length+" of "+targets.length+" target flags"+(misses.length?" and chose "+misses.length+" extra flags.":".");
$("flagChoicePool").innerHTML=pool.map(x=>{
const correct=targetCodes.has(x.code),chosen=selected.has(x.code);
return '<div class="flag-option-card '+(correct?"correct":chosen?"incorrect":"")+'">'+flagMarkup(x)+''+nameHtml(x)+'<span class="flag-name-whole">'+(correct?"✓ One of the flags to remember":chosen?"Not in this round":"")+'</span></div>';
}).join("");
$("flagSelectionCount").textContent=hits.length+" / "+targets.length+" correct";
$("checkFlagAnswers").disabled=true;$("clearFlagChoices").disabled=true;
celebrateFlagWin(perfect,hits.length,targets.length,misses.length);
$("flagGameResult").textContent=perfect?"You remembered every flag. Well done!":"The flags to remember were: "+targets.map(x=>x.name).join(", ")+". Try another round and see if you can remember them all.";
$("nextFlagRound").hidden=false;
});
$("nextFlagRound").addEventListener("click",startGame);
$("flagsNavButton").addEventListener("click",()=>{
const nav=$("flagsNav"),open=nav.classList.toggle("expanded");
$("flagsNavButton").setAttribute("aria-expanded",String(open));
});
$("flagsSubmenu").addEventListener("click",e=>{
if(e.target.closest("[data-view]")){$("flagsNav").classList.remove("expanded");$("flagsNavButton").setAttribute("aria-expanded","false");}
});
const originalNavigate=window.navigate;
if(typeof originalNavigate==="function"){
window.navigate=function(view){originalNavigate(view);$("flagsNavButton").classList.toggle("active",view==="flagSpotter"||view==="flagMemorizer");};
}
document.addEventListener("click",e=>{
const b=e.target.closest("[data-view]");
if(b&&b.dataset.view)$("flagsNavButton").classList.toggle("active",b.dataset.view==="flagSpotter"||b.dataset.view==="flagMemorizer");
});
updateProgress();renderLibrary();
})();