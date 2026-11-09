/* Separate memory-rhyme experience and desktop word-pane placement. */
(function(){
 "use strict";
 const panel=document.getElementById("wordPanel"),stage=document.querySelector("#readingView .story-reading-stage");
 if(panel&&stage)stage.appendChild(panel);
 let active=null,size=30;const $=id=>document.getElementById(id);
 const records=()=>readingChapters.filter(c=>c.category==="sahifa"&&c.rhyme);
 function show(record){active=record;$("rhymeTitle").textContent=record.title.replace(/^Sahifa\s*[·-]\s*/,"");$("rhymeSubtitle").textContent="An original Little Lanterns memory aid inspired by this supplication.";$("rhymeOrdinal").textContent="DUA "+(record.title.match(/Dua\s*(\d+)/i)?.[1]||"");$("rhymeText").textContent=record.rhyme;$("rhymeText").style.fontSize=size+"px";$("rhymeCredit").textContent="Original Little Lanterns learning aid. Not a quotation from Imam Sajjad.";document.querySelectorAll(".rhyme-choice").forEach(b=>b.classList.toggle("active",Number(b.dataset.rhyme)===records().indexOf(record)));}
 window.renderRhymesView=function(){const list=$("rhymeList"),items=records();if(!list)return;$("rhymeCount").textContent=items.length+" rhymes";list.innerHTML=items.length?items.map((r,i)=>'<button class="rhyme-choice '+(r===active?"active":"")+'" type="button" data-rhyme="'+i+'"><span class="rhyme-choice-icon">✦</span><span><b>'+escapeHtml(r.title.replace(/^Sahifa\s*[·-]\s*/,""))+'</b><small>Original memory rhyme</small></span></button>').join(""):'<p class="reading-no-results">New rhymes will appear here as they are prepared and reviewed.</p>';if(!active&&items.length)show(items[0]);};
 $("rhymeList")?.addEventListener("click",e=>{const b=e.target.closest("[data-rhyme]");if(b){const r=records()[Number(b.dataset.rhyme)];if(r)show(r);}});
 $("rhymePlay")?.addEventListener("click",()=>{if(active)speakText(active.rhyme);});
 $("rhymeStop")?.addEventListener("click",()=>{if("speechSynthesis"in window)window.speechSynthesis.cancel();});
 $("rhymeSmaller")?.addEventListener("click",()=>{size=Math.max(20,size-2);$("rhymeText").style.fontSize=size+"px";});
 $("rhymeLarger")?.addEventListener("click",()=>{size=Math.min(44,size+2);$("rhymeText").style.fontSize=size+"px";});
 if(location.hash==="#/rhymes")window.renderRhymesView();
})();
