import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index.html","utf8");
const language=fs.readFileSync("learner-language.js","utf8");
const css=fs.readFileSync("learner-language.css","utf8");
const workflow=fs.readFileSync(".github/workflows/pages.yml","utf8");

for (const id of ["learnerLanguage","learnerLanguageGlobal"]) {
  assert.ok(html.includes('id="'+id+'"'), "Missing learner language selector: "+id);
  const start=html.indexOf('id="'+id+'"');
  const select=html.slice(start,html.indexOf("</select>",start));
  for (const code of ["en","ar","fa","ur"]) assert.ok(select.includes('value="'+code+'"'), "Missing "+code+" option in "+id);
}
assert.ok(html.includes("./learner-language.css"),"Learner-language styles must load");
assert.ok(html.includes("./learner-language.js"),"Learner-language module must load");
assert.ok(workflow.includes("node --check learner-language.js"),"CI must syntax-check learner-language.js");
for (const languageCode of ["ar:","fa:","ur:"]) assert.ok(language.includes(languageCode),"Missing UI translations for "+languageCode);
for (const word of ["bark","log","pulp","fibre","fiber","press","screen","sheet","roller","chip","branch","tree","wood","paper","recycle","atom","electron","photon","quantum","laser","galaxy","nebula","exoplanet","orbit","gravity","robot","sensor","dna","gene","cell","ecosystem","photosynthesis","habitat","experiment","prediction","observation","scientist","atoms","electrons","photons","lasers","galaxies","nebulae","exoplanets","orbits","black","hole","telescope","asteroid","comet","planet","planets","robots","sensors","genes","cells","helix","pollination","evaporation","condensation","watercycle","biodiversity","habitats","nutrient","nutrients","observe","scientists","energy","electricity","artificial","intelligence"]) {
  assert.ok(language.includes(word+":{"),"Missing curated trilingual glossary entry: "+word);
}
assert.ok(language.includes('document.documentElement.dir=language==="en"?"ltr":"rtl"'),"Interface direction must follow selected language");
assert.ok(language.includes('passage.lang="en";passage.dir="ltr"'),"English reading passages must remain left-to-right");
assert.ok(language.includes('localStorage.setItem("littleLanternsLearnerLanguage",language)'),"Learner language preference must persist");
assert.ok(language.includes('translateTree()'),"Dynamic interface text must be translated");
assert.ok(css.includes("body.learner-rtl"),"RTL layout rules must be present");
assert.ok(css.includes(".story-reading-stage")&&css.includes("direction:ltr"),"RTL interface must not reverse English story text");

const enhancements=fs.readFileSync("reading-enhancements.js","utf8");
for (const word of ["bark","chip","fibre","fiber","log","pulp","press","roller","screen","sheet","wood"]) {
  assert.ok(enhancements.includes(word+":"), "Missing English child-friendly paper vocabulary: "+word);
}
assert.ok(enhancements.includes("contextualGlossaryMeaning"),"Glossary definitions must use story context for ambiguous words");
assert.ok(enhancements.includes("translateMeaning(word, initialMeaning)"),"Word meanings must use the selected learner language");
assert.ok(enhancements.includes("meaningNode.dataset.englishMeaning = definition"),"Keep the English source meaning available for language switching");

console.log("Validated English, Arabic, Persian and Urdu selectors, RTL/LTR behavior, preference persistence and 15 curated glossary entries.");
