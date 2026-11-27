import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const enhancements = fs.readFileSync("reading-enhancements.js", "utf8");
const css = fs.readFileSync("reader-layout.css", "utf8");

assert.match(html, /<dialog[^>]*id="wordPanel"[^>]*aria-labelledby="wordDisplay"/,
  "Word meanings must use an accessible native dialog");
assert.match(html, /id="closeWord"[^>]*aria-label="Close word meaning"/,
  "Dialog needs a clearly labelled close button");
assert.match(html, /id="hearMeaning"[^>]*aria-label="Hear the meaning"/,
  "Meaning audio button needs an accessible label");
assert.match(html, /id="hearWord"[^>]*aria-label="Hear word pronunciation again"/,
  "Selected word needs an accessible pronunciation replay icon");
assert.match(app, /function openWordModal\(target\)[\s\S]*?dialog\.showModal\(\)/,
  "Selecting a word must open the modal");
assert.match(app, /function openWordModal\(target\)[\s\S]*?speakText\(target\.dataset\.word\|\|""\)/,
  "Opening the modal must pronounce the selected word automatically");
assert.match(app, /\$\("hearWord"\)\.addEventListener\("click",\(\)=>speakText\(\$\("wordDisplay"\)\.textContent\)\)/,
  "Pronunciation icon must replay the selected word");
assert.match(app, /function closeWordModal\(\)[\s\S]*?dialog\.close\(\)/,
  "Modal close helper must close the native dialog");
assert.match(app, /event\.target===\$\("wordPanel"\)/,
  "Clicking the backdrop must close the modal");
assert.match(app, /\$\("wordPanel"\)\.addEventListener\("close"/,
  "Native dialog close (including Escape) must clean up speech and restore focus");
assert.match(app, /\$\("hearMeaning"\)\.addEventListener\("click",\(\)=>speakText\(\$\("wordMeaning"\)\.textContent\)\)/,
  "Speaker button must read the definition, not the selected word");
assert.match(enhancements, /openWordModal\(target\)/,
  "Extended glossary selection must use the same modal");
assert.doesNotMatch(enhancements, /speakText\(word\)/,
  "Tapping a word must not automatically start speech");
assert.match(enhancements, /document\.getElementById\("wordPanel"\)\.open/,
  "Asynchronous definitions must update only while the dialog is open");
assert.match(css, /\.word-modal::backdrop/,
  "Dialog backdrop must be styled");
assert.match(css, /@media\(max-width:520px\)[\s\S]*?\.word-modal/,
  "Dialog must have a phone-specific responsive layout");
assert.match(css, /\.meaning-audio-button:focus-visible/,
  "Audio control must have a visible keyboard focus style");

console.log("Word meaning modal validation passed.");


assert.ok(enhancements.includes("const contextWords = new Set(context.toLowerCase().match"),"Online definitions must be ranked using the current story sentence");
assert.ok(enhancements.includes("const stopWords = new Set"),"Common words must not dominate contextual dictionary ranking");
assert.ok(enhancements.includes("This word has more than one possible meaning."),"Ambiguous dictionary results must be explained instead of guessing");
