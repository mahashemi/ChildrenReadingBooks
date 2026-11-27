import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index.html","utf8");
const app=fs.readFileSync("app.js","utf8");
const visuals=fs.readFileSync("reader-visuals.css","utf8");
const layout=fs.readFileSync("reader-layout.css","utf8");

assert.ok(html.includes('id="conceptExplorerToggle"'),"Reader toolbar must expose the Concepts button");
assert.ok(html.includes('id="conceptModal"'),"The accessible concept dialog must exist");
assert.ok(html.includes('id="conceptAnimation"'),"The dialog must contain an animation stage");
assert.ok(html.includes('aria-labelledby="conceptModalTitle"'),"The concept dialog must have an accessible title");
assert.ok(app.includes("function renderConceptExplorer(current,media)"),"The current page must populate the concept explorer");
assert.ok(app.includes("keyConceptWords.has(word)"),"The modal must surface key concepts found in the current passage");
assert.ok(app.includes('addEventListener("click",openConceptModal)'),"The Concepts button must open the dialog");
assert.ok(app.includes('addEventListener("close",()=>$("conceptExplorerToggle").focus())'),"Closing the dialog must restore focus");
assert.ok(visuals.includes(".story-art{display:none!important}"),"Decorative chapter art must not appear in the reading pane");
assert.ok(!visuals.includes("little-lanterns-art-drift"),"Background illustration motion must be removed from the reading pane");
assert.ok(layout.includes("@media(prefers-reduced-motion:reduce)"),"Concept animations must respect reduced-motion preferences");
assert.ok(layout.includes(".concept-animation-stage svg"),"The modal illustration must receive its own animation styling");

console.log("Validated reading-pane artwork removal and accessible animated concept explorer.");
