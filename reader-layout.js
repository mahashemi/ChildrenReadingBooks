/* Reader presentation only. Narration, highlighting and speech state are owned by app.js. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const toolbar=document.querySelector(".audio-toolbar-main");
if(!toolbar)return;

const size=document.createElement("div");
size.className="reader-inline-text-size";
size.setAttribute("role","group");
size.setAttribute("aria-label","Reading text size");

const originalSizeGroup=document.querySelector(".drawer-setting-group:has(#smallerText)");
if(originalSizeGroup)originalSizeGroup.style.display="none";
const transport=document.createElement("div");
transport.className="reader-transport-group";
transport.setAttribute("role","group");
transport.setAttribute("aria-label","Playback controls");
const play=$("readAloud"),stop=$("stopSpeech");
if(play&&stop){
  toolbar.insertBefore(transport,play);
  transport.append(play,stop);
}

const smaller=$("smallerText"),larger=$("largerText");
if(smaller&&larger){
  size.append(smaller,larger);
  const expand=$("toggleImmersive");
  toolbar.insertBefore(size,expand||null);
  smaller.textContent="A−";larger.textContent="A+";
  smaller.title="Smaller text";larger.title="Larger text";
}

const settings=$("settingsSidebar");
if(settings){
  const sizeGroup=settings.querySelector(".drawer-setting-group:has(#smallerText)");
  if(sizeGroup)sizeGroup.hidden=true;
  settings.querySelectorAll(".drawer-check").forEach(el=>{
    el.hidden=false;
    el.removeAttribute("aria-hidden");
  });
  const note=settings.querySelector(".drawer-section-heading small");
  if(note)note.textContent="Choose how words appear, follow along and select a narrator";
}

document.querySelectorAll(".audio-speed-control button").forEach(button=>{
  button.textContent=button.id==="slowerSpeech"?"−":"+";
});
const expand=$("toggleImmersive");
if(expand){
  expand.textContent="⛶";
  expand.setAttribute("aria-label","Expand the reader");
  expand.title="Expand the reader";
}
})();