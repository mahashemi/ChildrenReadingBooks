import fs from "node:fs";
import assert from "node:assert/strict";

const app = fs.readFileSync("app.js", "utf8");
const metadataPass = app.indexOf("readingChapters.forEach((chapter,index)=>{");
const stemRegistration = app.indexOf("/* Original preschool STEM adventures.");
assert.ok(stemRegistration >= 0, "STEM chapter registration must exist");
assert.ok(metadataPass > stemRegistration, "Chapter metadata must be assigned after STEM chapters are registered");
assert.ok(app.includes("chapterMedia:storyPages[i].media||null"), "Page media must be copied into chapter metadata");
assert.ok(app.includes("const media=current.chapterMedia||current.media;"), "Reader must support page-level media fallback");
assert.ok(app.includes("safeChapterIndex>=0?"), "Reader chapter label must have a safe fallback");
assert.ok(app.includes("classes.push(\"key-concept\")"), "Key concepts must retain their word-level span styling");

const mediaScript = fs.readFileSync("scripts/validate-stem-media.mjs", "utf8");
assert.ok(mediaScript.includes("media.length, 19"), "The STEM media validator must continue checking all 19 page illustrations");
console.log("Validated chapter metadata order, media wiring, safe chapter labels and key-concept rendering.");
