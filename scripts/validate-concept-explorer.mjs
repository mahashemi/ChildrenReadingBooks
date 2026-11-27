import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("app.js","utf8");
const visuals=fs.readFileSync("reader-visuals.css","utf8");
const layout=fs.readFileSync("reader-layout.css","utf8");

assert.ok(html.includes('id="conceptExplorerToggle"'),"Reader toolbar must expose the Concepts button");
assert.ok(html.includes('id="conceptModal"'),"The accessible concept dialog must exist");
assert.ok(html.includes('id="conceptAnimation"'),"The dialog must contain an animation stage");
assert.ok(html.includes('id="nextConcept"')&&html.includes('id="previousConcept"'),"Concept slides must have next and previous controls");
assert.ok(html.includes('id="hearConcept"'),"Children must be able to replay concept narration");
assert.ok(html.includes('aria-labelledby="conceptModalTitle"'),"The concept dialog must have an accessible title");
assert.ok(app.includes("function renderConceptExplorer(current)"),"The current chapter must populate the concept explorer");
assert.ok(app.includes("illustratedPages.length?illustratedPages:[current]"),"The carousel must use distinct illustrated lesson pages without repeating fallback art");
assert.ok(app.includes("function showConceptSlide(index,announce)"),"Concept navigation must render individual slides");
assert.ok(app.includes("speakText(slide.caption||slide.alt)"),"Opening and advancing concepts must narrate the current idea");
assert.ok(app.includes('addEventListener("click",()=>showConceptSlide(conceptSlideIndex+1,true))'),"Next must advance and narrate");
assert.ok(app.includes('addEventListener("click",openConceptModal)'),"The Concepts button must open the dialog");
assert.ok(app.includes('addEventListener("close",()=>$("conceptExplorerToggle").focus())'),"Closing the dialog must restore focus");
assert.ok(visuals.includes(".story-art{display:none!important}"),"Decorative chapter art must not appear in the reading pane");
assert.ok(!visuals.includes("little-lanterns-art-drift"),"Background illustration motion must be removed from the reading pane");
assert.ok(layout.includes("grid-template-columns:max-content max-content minmax(0,1fr) 38px"),"Reader toolbar must reserve a fixed slot for settings");
assert.ok(layout.includes(".concept-navigation .concept-next-button"),"Concept next control must have a distinct child-friendly style");
assert.ok(layout.includes("@media(prefers-reduced-motion:reduce)"),"Concept animations must respect reduced-motion preferences");

console.log("Validated anchored reader settings and narrated multi-slide concept explorer.");
