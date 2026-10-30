/* Little Lanterns — flag learning games */
(function(){
"use strict";
const entries=(window.LITTLE_LANTERNS_FLAGS||[]).map(x=>Object.assign({},x));
const $=id=>document.getElementById(id);
const countries=entries.filter(x=>x.status==="country");
const extras=entries.filter(x=>x.status!=="country");
const storageKey="littleLanterns.flagProgress.v1";
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
return '<img class="flag-image" src="https://flagcdn.com/w160/'+entry.code.toLowerCase()+'.png" alt="'+escapeHtml(entry.name)+' flag" loading="lazy"><span class="flag-emoji" hidden>'+emoji(entry.code)+'</span>';
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
function updateSelection(){
$("flagSelectionCount").textContent=selected.size+" of "+targetCount+" selected";
$("checkFlagAnswers").disabled=selected.size===0;
}
function showPool(){
stopTimer();phase="choose";$("flagGamePhase").textContent="FIND THE FLAGS";
$("flagGameTitle").textContent="Which flags did you see?";
$("flagGameInstruction").textContent="Tap every flag you remember. The country name will be spoken and shown beneath each flag you select.";
$("flagGameTimer").textContent=targetCount+" to find";$("flagTargets").innerHTML="";
$("flagPoolWrap").hidden=false;$("flagTargetBadge").textContent=targetCount+" to find";
$("flagChoicePool").innerHTML=pool.map(x=>card(x,"flag-option-card",false)).join("");
updateSelection();
}
function startGame(){
stopTimer();selected.clear();
const list=source(),n=Math.min(Number($("flagTargetCount").value),list.length),size=Math.min(Math.max(n,Number($("flagPoolSize").value)),list.length);
targetCount=n;targets=shuffle(list).slice(0,n);targets.forEach(x=>addUnique(progress.seen,x.code));save();updateProgress();
pool=shuffle(targets.concat(shuffle(list.filter(x=>!targets.some(t=>t.code===x.code))).slice(0,size-n)));
left=Number($("flagShowSeconds").value);phase="memorise";
$("flagGamePhase").textContent="MEMORISE THESE FLAGS";$("flagGameTitle").textContent="Look carefully!";
$("flagGameInstruction").textContent="Remember all "+n+" flags. They will disappear when the timer reaches zero.";
$("flagGameTimer").textContent=left+" seconds";
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