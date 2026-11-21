import fs from "node:fs";
import assert from "node:assert/strict";

const app = fs.readFileSync("app.js", "utf8");
const sprite = fs.readFileSync("assets/stem-illustrations.svg", "utf8");
const visuals = fs.readFileSync("reader-visuals.css", "utf8");
const enhancements = fs.readFileSync("reading-enhancements.js", "utf8");
const index = fs.readFileSync("index.html", "utf8");
const media = [...app.matchAll(/media:m\("([^"]+)","([^"]+)","([^"]+)"\)/g)];
const symbols = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(match => match[1]));
assert.equal(media.length, 19, "Expected one background illustration for each new STEM reading page");
assert.ok(!app.includes("exploreUrl") && !app.includes("exploreLabel"), "External activity links must be removed from lesson media data");
assert.ok(!app.includes("current.chapterSourceUrl"), "External source URLs must not be rendered in the child reading pane");
assert.ok(app.includes('$("sourceNoteText").innerHTML=linkQuranSourceNote(current.chapterSource);'), "Keep readable source attribution and Qur\u2019an reference links without external activity URLs");
assert.ok(index.includes("./reader-visuals.css"), "The shared reader visual stylesheet must be loaded");
assert.ok(!index.includes("lesson-media.css") && !index.includes('id="lessonMedia"'), "The old space-consuming illustration panel must stay removed");
assert.ok(visuals.includes("display:block!important"), "Lesson artwork must be visible behind the passage");
assert.ok(visuals.includes("position:absolute!important"), "Lesson artwork must be positioned as background art");
assert.ok(visuals.includes("#readingView.active .story-reading-stage .story-art"), "Background artwork must override the reader\u2019s existing hidden-art rule");
assert.ok(visuals.includes("@media(max-width:380px)"), "The background must be especially subtle on very narrow phones");
assert.ok(visuals.includes("prefers-reduced-motion:reduce"), "Decorative animation must respect reduced-motion settings");
for (const term of ["atoms","electrons","photons","lasers","galaxies","nebulae","exoplanets","orbits","planets","robots","sensors","genes","habitats","nutrient","scientists","gravity"]) {
  assert.ok(enhancements.includes(term + ':"'), `Missing child-friendly glossary definition: ${term}`);
}
assert.ok(enhancements.includes("if (localMeaning || isKeyConcept)"), "Every locally defined word and key concept must receive visual emphasis");
for (const [, id, alt, caption] of media) {
  assert.ok(symbols.has(id), `Missing SVG symbol: ${id}`);
  assert.ok(alt.trim().length > 12, `Image alt text is too short: ${id}`);
  assert.ok(caption.trim().length > 10, `Image caption is too short: ${id}`);
}
for (const title of ["Tiny World, Big Ideas","Space ABC","The Little Scientist’s Discovery Primer","Meet the Robots","The Secret Code Inside You","Worlds Beyond Our Sun"]) {
  assert.ok(app.includes(title), `Missing STEM chapter: ${title}`);
}
console.log(`Validated ${media.length} STEM background illustrations and ${symbols.size} SVG symbols across six chapters.`);
