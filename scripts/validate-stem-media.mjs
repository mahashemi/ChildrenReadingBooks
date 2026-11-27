import fs from "node:fs";
import assert from "node:assert/strict";

const app = fs.readFileSync("app.js", "utf8");
const sprite = fs.readFileSync("assets/stem-illustrations.svg", "utf8");
const visuals = fs.readFileSync("reader-visuals.css", "utf8");
const enhancements = fs.readFileSync("reading-enhancements.js", "utf8");
const layout = fs.readFileSync("reader-layout.css", "utf8");
const index = fs.readFileSync("index.html", "utf8");
const media = [...app.matchAll(/media:m\("([^"]+)","([^"]+)","([^"]+)"\)/g)];
const symbols = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(match => match[1]));
assert.equal(media.length, 20, "Expected one background illustration for each new STEM reading page");
assert.ok(!app.includes("exploreUrl") && !app.includes("exploreLabel"), "External activity links must be removed from lesson media data");
assert.ok(!app.includes("current.chapterSourceUrl"), "External source URLs must not be rendered in the child reading pane");
assert.ok(app.includes('$("sourceNoteText").innerHTML=linkQuranSourceNote(current.chapterSource);'), "Keep readable source attribution and Qur\u2019an reference links without external activity URLs");
assert.ok(index.includes("./reader-visuals.css"), "The shared reader visual stylesheet must be loaded");
assert.ok(!index.includes("lesson-media.css") && !index.includes('id="lessonMedia"'), "The old space-consuming illustration panel must stay removed");
assert.ok(visuals.includes(".story-art{display:none!important}"), "Lesson artwork must stay out of the reading pane");
assert.ok(!visuals.includes("little-lanterns-art-drift"), "Background artwork animation must not run in the reading pane");
assert.ok(visuals.includes("#readingView.active .story-reading-stage .story-art"), "Background artwork must override the reader\u2019s existing hidden-art rule");
assert.ok(layout.includes(".concept-animation-stage"), "Lesson illustrations must be available in the on-demand concept modal");
assert.ok(layout.includes("prefers-reduced-motion:reduce"), "Concept animation must respect reduced-motion settings");
for (const term of ["atoms","electrons","photons","lasers","galaxies","nebulae","exoplanets","orbits","planets","robots","sensors","genes","habitats","nutrient","scientists","gravity"]) {
  assert.ok(enhancements.includes(term + ':"'), `Missing child-friendly glossary definition: ${term}`);
}
assert.ok(enhancements.includes("if (localMeaning || isKeyConcept)"), "Every locally defined word and key concept must receive visual emphasis");
assert.ok(enhancements.includes('data-char-start="'), "Rendered word spans must expose source character offsets");
assert.ok(enhancements.includes("speechSearchFrom"), "Word offsets must be calculated against the original paragraph");
assert.ok(app.includes("startSpeechFallback"), "Narration must have a fallback when speech boundary events are absent");
assert.ok(app.includes("clearSpeechFallback"), "Narration fallback timers must be cleaned up on pause, stop and cancellation");
assert.ok(app.includes("node.dataset.charStart"), "Narration highlighting must map character positions to rendered word spans");
assert.ok(app.includes("lastBoundaryAt"), "Fallback progression must yield to real speech boundary events");
for (const [, id, alt, caption] of media) {
  assert.ok(symbols.has(id), `Missing SVG symbol: ${id}`);
  assert.ok(alt.trim().length > 12, `Image alt text is too short: ${id}`);
  assert.ok(caption.trim().length > 10, `Image caption is too short: ${id}`);
}
for (const title of ["Tiny World, Big Ideas","Space ABC","The Little Scientist’s Discovery Primer","Meet the Robots","The Secret Code Inside You","Worlds Beyond Our Sun"]) {
  assert.ok(app.includes(title), `Missing STEM chapter: ${title}`);
}
console.log(`Validated ${media.length} STEM concept illustrations and ${symbols.size} SVG symbols across six chapters.`);
