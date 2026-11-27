import fs from "node:fs";
import assert from "node:assert/strict";

const css=fs.readFileSync("responsive-cleanup.css","utf8");
const html=fs.readFileSync("index.html","utf8");
assert.ok(css.includes("@media(min-width:761px)"),"Desktop refinement must be isolated to desktop widths");
assert.ok(css.includes("height:clamp(620px,calc(100svh - 190px),980px)"),"Desktop reader must use a viewport-aware height");
assert.ok(css.includes("max-height:760px"),"Short desktop viewports need a compact layout");
assert.ok(css.includes(".story-reading-stage"),"The reading stage must receive the visual emphasis");
assert.ok(css.includes(".audio-toolbar"),"Narration controls must remain styled within the reader card");
assert.ok(html.includes("./responsive-cleanup.css"),"Responsive cleanup stylesheet must be loaded");
console.log("Validated desktop reader visual refinement and short-viewport rules.");
