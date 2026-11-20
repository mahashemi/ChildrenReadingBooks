import fs from "node:fs";
import assert from "node:assert/strict";

const app = fs.readFileSync("app.js", "utf8");
const sprite = fs.readFileSync("assets/stem-illustrations.svg", "utf8");
const media = [...app.matchAll(/media:m\("([^"]+)","([^"]+)","([^"]+)","(https:\/\/[^"]+)","([^"]+)"\)/g)];
const symbols = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(match => match[1]));
assert.equal(media.length, 19, "Expected one illustrated media panel for each new STEM reading page");
for (const [, id, alt, caption, url, label] of media) {
  assert.ok(symbols.has(id), `Missing SVG symbol: ${id}`);
  assert.ok(alt.trim().length > 12, `Image alt text is too short: ${id}`);
  assert.ok(caption.trim().length > 10, `Image caption is too short: ${id}`);
  assert.ok(label.trim().length > 4, `Explore link label is too short: ${id}`);
  assert.ok(new URL(url).protocol === "https:", `Explore link must use HTTPS: ${url}`);
}
for (const title of ["Tiny World, Big Ideas","Space ABC","The Little Scientist’s Discovery Primer","Meet the Robots","The Secret Code Inside You","Worlds Beyond Our Sun"]) {
  assert.ok(app.includes(title), `Missing STEM chapter: ${title}`);
}
console.log(`Validated ${media.length} STEM media panels and ${symbols.size} SVG symbols across six chapters.`);
