/* Reader controls: move settings out of the reading canvas and provide word-boundary pause/resume. */
(function(){
"use strict";
const $=id=>document.getElementById(id),toolbar=document.querySelector(".audio-toolbar-main"),play=$("readAloud");
if(!toolbar||!play)return;
const size=document.createElement("div");size.className="reader-inline-text-size";size.setAttribute("role","group");size.setAttribute("aria-label","Reading text size");
const smaller=$("smallerText"),larger=$("largerText");
if(smaller&&larger){size.append(smaller,larger);toolbar.insertBefore(size,$("toggleImmersive"));smaller.textContent="A−";larger.textContent="A+";smaller.title="Smaller text";larger.title="Larger text";}
const settings=$("settingsSidebar");
if(settings){
 const sizeGroup=settings.querySelector(".drawer-setting-group:has(#smallerText)");if(sizeGroup)sizeGroup.hidden=true;
 settings.querySelectorAll(".drawer-check").forEach(el=>{el.hidden=true;el.setAttribute("aria-hidden","true");});
 const note=settings.querySelector(".drawer-section-heading small");if(note)note.textContent="Choose how words appear and who reads them";
}
document.querySelectorAll(".audio-speed-control button").forEach(b=>{b.textContent=b.id==="slowerSpeech"?"−":"+";});
const expand=$("toggleImmersive");if(expand){expand.innerHTML="⛶";expand.setAttribute("aria-label","Expand the reader");expand.title="Expand the reader";}
function sourceParagraphs(){
 return Array.from($("storyText").children).map(node=>{
  const clone=node.cloneNode(true);clone.querySelectorAll(".story-word").forEach(w=>{w.textContent=w.dataset.word||w.textContent;});
  return clone.textContent.replace(/\s+/g," ").trim();
 }).filter(Boolean);
}
let active=false,paused=false,token=0,parts=[],p=0,offset=0,lastWord=0,rate=1;
function voice(){
 const list=speechSynthesis.getVoices(),select=$("speechVoice");
 return (select&&select.value&&list.find(v=>v.voiceURI===select.value))||list.find(v=>/^en[-_]US/i.test(v.lang))||list.find(v=>/^en([_-]|$)/i.test(v.lang)&&!/^en[-_]NG/i.test(v.lang));
}
function controls(){
 play.innerHTML='<span class="audio-play-icon">'+(active&&!paused?"Ⅱ":"▶")+'</span>';
 play.title=active&&!paused?"Pause narration":paused?"Resume narration":"Start narration";play.setAttribute("aria-label",play.title);
 $("stopSpeech").disabled=!active&&!paused;
}
function speak(){
 if(!active||paused)return;
 if(p>=parts.length){active=false;paused=false;offset=0;controls();return;}
 const text=parts[p].slice(offset);if(!text){p++;offset=0;speak();return;}
 const id=token,u=new SpeechSynthesisUtterance(text);u.rate=rate;const v=voice();if(v){u.voice=v;u.lang=v.lang||"en-US";}
 u.onboundary=e=>{
  if(id!==token||!active||paused||typeof e.charIndex!=="number")return;
  const before=parts[p].slice(0,offset+e.charIndex),m=before.match(/[A-Za-z]+(?:'[A-Za-z]+)?$/);
  if(m){lastWord=before.length-m[0].length;const nodes=Array.from($("storyText").children[p]?.querySelectorAll(".story-word")||[]);nodes.forEach(n=>n.classList.remove("is-speaking"));const target=nodes.find(n=>(n.dataset.word||"").toLowerCase().replace(/'s$/,"")===m[0].toLowerCase().replace(/'s$/,""));if(target){target.classList.add("is-speaking");target.scrollIntoView({block:"nearest",behavior:"smooth"});}}
 };
 u.onend=()=>{if(id!==token||paused||!active)return;p++;offset=0;lastWord=0;speak();};
 u.onerror=e=>{if(id!==token)return;if(e.error!=="canceled"&&e.error!=="interrupted"){active=false;paused=false;controls();}};
 speechSynthesis.speak(u);
}
function start(){speechSynthesis.cancel();parts=sourceParagraphs();p=0;offset=0;lastWord=0;rate=parseFloat($("speechRate").textContent)||1;if(!parts.length)return;active=true;paused=false;token++;controls();speak();}
function pause(){const tail=(parts[p]||"").slice(lastWord),next=tail.search(/[A-Za-z]+(?:'[A-Za-z]+)?/);offset=next<0?lastWord:lastWord+next;token++;speechSynthesis.cancel();active=true;paused=true;controls();}
function resume(){paused=false;token++;controls();speak();}
function stop(){token++;speechSynthesis.cancel();active=false;paused=false;p=0;offset=0;lastWord=0;$("storyText").querySelectorAll(".is-speaking").forEach(n=>n.classList.remove("is-speaking"));controls();}
play.addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();if(!active&&!paused)start();else if(paused)resume();else pause();},true);
$("stopSpeech").addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();stop();},true);
["slowerSpeech","fasterSpeech"].forEach(id=>$(id).addEventListener("click",e=>{
 e.preventDefault();e.stopImmediatePropagation();rate=Math.max(.1,Math.min(1.5,Math.round((rate+(id==="slowerSpeech"?-.1:.1))*10)/10));$("speechRate").textContent=rate.toFixed(1)+"×";if(active&&!paused){pause();resume();}
},true));
["previousPage","nextPage","chapterDrawerToggle"].forEach(id=>$(id).addEventListener("click",stop,true));
document.querySelectorAll(".mode-button").forEach(b=>b.addEventListener("click",()=>{if(active||paused)stop();}));
$("toggleImmersive").addEventListener("click",()=>{const on=document.body.classList.contains("reader-immersive");expand.innerHTML=on?"⛶":"↙";expand.title=on?"Expand the reader":"Exit immersive reading";expand.setAttribute("aria-label",expand.title);});
window.addEventListener("beforeunload",stop);controls();
})();