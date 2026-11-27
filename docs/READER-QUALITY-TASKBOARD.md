# Reader Quality Taskboard

_Last updated: 2026-11-27_

Scope: improve the shared reading experience across every chapter and collection. Reading text always takes priority over decorative artwork. Preserve mobile/desktop layouts, word tapping, syllable modes, contextual meanings and narration behavior.

## Priority key
- **P0 — Release blocker:** visible broken functionality or incorrect reader state.
- **P1 — High:** core learning experience quality.
- **P2 — Follow-up:** broader curriculum and polish.

## Active work

| Priority | Task | Status | Acceptance criteria |
|---|---|---|---|
| P0 | Keep lesson artwork out of the reading area | Merged in PR #57; CI and Pages deployment passed; physical browser review pending | The reading pane contains text only; artwork appears on demand in the Concepts modal. |
| P0 | Remove child-facing external activity links | Implemented in PR #53; CI passed | No external activity or source URLs render in the child reading pane; plain attribution and Qur’an cross-references remain. |
| P1 | Apply consistent vocabulary emphasis across all chapters | Implemented in PR #53; CI passed; visual review pending | New glossary words and key concepts use bold, varied colours; ordinary text stays calm; definitions, tapping and narration highlighting continue to work. |
| P1 | Respect reduced-motion preferences | Implemented in PR #57; CI passed | Concept-modal animation stops when the device requests reduced motion; reading and narration are unaffected. |
| P0 | Give desktop reading pane a comfortable viewport height | Implemented in PR #53 follow-up; CI/browser review pending | Normal desktop mode uses the available viewport height; the passage receives remaining card space; mobile layout is unchanged. |
| P0 | Make word-follow highlighting reliable in mobile Chrome | Implemented in PR #53 follow-up; CI/device review pending | Character offsets map to actual rendered word spans; estimated progress advances when boundary events are absent; pause/resume, speed changes and stop clear/restart fallback state safely. |
| P0 | Eliminate READING CHAPTER NaN | Fix merged; CI passed | Every page has a valid chapter index; defensive fallback never renders NaN. |
| P1 | Add regression validation for chapter metadata and media wiring | CI passed | CI checks registration order, chapter coverage, media references and fallback label logic. |
| P1 | Verify reader in Chrome and narrow mobile viewport | Pending | Artwork, paragraph flow, emphasis, audio and navigation are checked in a real browser. |

| P0 | Replace inline word meanings with a responsive modal and definition audio | Merged in PR #54; CI passed; browser/device review pending | Tapping a word opens a centered dialog on phone and desktop; a large speaker button reads the definition (not the word); close button, Escape, backdrop click, focus return and audio stop all work. |

| P0 | Auto-pronounce the selected word when its meaning modal opens, with a replay icon | Implemented in current PR; CI/browser review pending | Opening a word modal speaks the word once; a dedicated speaker icon beside the word repeats its pronunciation. Definition audio remains a separate control. |

| P1 | Add an on-demand animated concept explorer | Merged in PR #57; CI and Pages deployment passed; physical browser review pending | A button beside Chapters opens a responsive modal with the current page illustration, gentle animation and key concepts detected in the passage. Escape/backdrop/close and focus restoration work. |

## Current design requirements
- [x] Keep decorative SVGs out of the reading stage; show them only when a child opens Concepts.
- [x] Ensure the reading stage is text-only so no illustration can obscure words or consume passage space.
- [x] Animate only decorative elements gently; support `prefers-reduced-motion` and do not compete with word-follow highlighting.
- [x] Use four coordinated vocabulary colours for every curated glossary word and stronger emphasis for key concepts; avoid colouring every ordinary word.
- [x] Remove activity/exploration links from child-facing reading pages while retaining factual source attribution separately.
- [ ] Verify at 320px, 375px, tablet and desktop widths; reading pane must remain the dominant visual element.
- [ ] Verify mobile Chrome narration on a physical device; confirm boundary-event fallback, pause/resume and speed changes.
- [ ] Verify word-meaning dialog on phone and desktop, including Escape, outside click, focus return and definition audio.

## Root-cause findings
- [x] **Metadata registration order identified:** metadata was assigned before the six STEM chapters were appended. Their pages therefore had no chapterIndex, chapterPage, chapterLength or chapterMedia.
- [x] **Illustration dependency identified:** the SVG panel reads chapterMedia; missing metadata kept it hidden even though the SVG file and references existed.
- [x] **NaN cause identified:** the reader tag directly added one to an undefined chapterIndex.

## Fix tracking
- [x] Move metadata registration after all chapters and pages—including STEM—are registered.
- [x] Add a defensive chapter-label fallback.
- [x] Apply key-concept styling without replacing or wrapping narration tokens.
- [x] Run JavaScript syntax, STEM media and metadata validation in CI.
- [x] Verify CI validation on PR; [ ] confirm post-merge GitHub Pages deployment.

## Latest implementation — scientist home experiment
- [x] Add a child-led paper-bridge investigation using two books, one sheet of paper and coins.
- [x] Teach question, prediction, fair testing (change one variable), counting, observation, evidence and repeating a test.
- [x] Include adult-supervision and coin-safety guidance.
- [x] Add regression assertions to the existing chapter metadata validator.
- [ ] Confirm PR CI and GitHub Pages deployment.

## Next priorities
### P1 — reading quality
- Review sentence length and reading level with a six-year-old early reader.
- Improve paragraph rhythm and use emphasis sparingly: key words, not whole paragraphs.
- Verify contextual vocabulary and syllable annotations for STEM terms.

### P2 — curriculum expansion
- Add source-checked adventures on oceans, dinosaurs and fossils, renewable energy, the human brain, climate and medical imaging.
- Add learner-language glossary support (Arabic, Persian and Urdu) while keeping the reading passage in English.
- Continue offline/Android compatibility checks.

## Change log
- 2026-11-21: Created board and diagnosed the registration-order bug.
- 2026-11-21: Moved metadata registration after all lesson additions; added defensive chapter numbering, key-concept emphasis and a CI regression validator.
- 2026-11-21: PR #52 squash-merged; validation workflow passed. Post-merge GitHub Pages deployment queued/in progress.
- 2026-11-21: Implemented site-wide reading-first visuals in PR #53. Deeper review fixed CSS specificity on mobile, removed external source/activity URLs from the child reading pane, removed the obsolete panel stylesheet, and expanded offline definitions and colour emphasis to plural STEM terms and all locally defined vocabulary. Latest CI passed; browser/device review remains open.

- 2026-11-22: PR #53 follow-up: expanded the normal desktop reader card to use viewport height; added source-character offsets to rendered word spans and a timed narration-highlight fallback for browsers with missing/irregular word-boundary events. Automated and physical-device validation pending.

- 2026-11-22: Replaced the cramped inline word explorer with a responsive native dialog. Word taps open the dialog and automatically pronounce the selected word; a speaker icon replays it, while the separate meaning-audio control reads the definition. Escape, backdrop click, close button, focus return and audio cancellation are wired; browser/device review pending (PR #55 merged; CI passed).

- 2026-11-22: Added a four-step home science experiment to The Little Scientist’s Discovery Primer: children compare a flat and folded paper bridge, count how many coins each holds, and learn to change one variable at a time. CI regression checks cover materials, fair-test guidance and adult supervision.


- 2026-11-27: Removed the corner artwork from the reading pane. Added a Concepts button beside Chapters; its accessible modal shows the current page's local SVG illustration with gentle motion and key-concept tags from the passage. Reduced-motion, Escape, backdrop close and focus return are covered by CSS/behavior and regression checks. Browser/device review pending.


## Latest interaction pass — narrated concept carousel and toolbar alignment
- [x] Pin the reading-settings control to a dedicated right-hand toolbar column across desktop and mobile widths.
- [x] Replace the single concept illustration with a chapter carousel built from distinct illustrated lesson pages.
- [x] Add Back, Next and Hear controls; opening a concept and moving to another slide reads its explanation aloud using the selected browser narrator and reading speed.
- [x] Avoid duplicate fallback slides in chapters without page-level concept artwork.
- [x] Add regression checks for toolbar placement, slide navigation, narration, focus restoration and reduced-motion support.
- [ ] Verify toolbar alignment and concept navigation on physical mobile Chrome and desktop browsers.


## Contextual concept descriptions
- [x] Remove the generic picture prompt and use each slide's authored explanation or a meaningful sentence from that story page.
- [x] Avoid generic fallback tags when no key concept keyword is detected.
- [x] Add regression checks preventing the static prompt and tag from returning.

## Concept narration clarity
- [x] Normalize concept captions so every spoken description ends with clear sentence punctuation.
- [x] Speak sentence-by-sentence with a short pause between sentences, while preserving comma pauses within sentences.
- [x] Ensure opening the Concepts modal starts narration; remove the duplicate modal opener that shadowed the narrated implementation.
- [x] Add regression checks for punctuation, sentence pauses, and narration on modal open.
- [ ] Listen to narration on physical mobile Chrome and desktop browsers and tune pause length if needed.


## Learner-language support — first release
- [x] Add English, Arabic, Persian and Urdu interface selectors in the header and reading settings.
- [x] Keep English story passages explicitly left-to-right while the surrounding interface follows Arabic/Persian/Urdu direction.
- [x] Persist the selected learner language and translate dynamically rendered interface text.
- [x] Add curated Arabic, Persian and Urdu meanings for 15 paper-making vocabulary terms; clearly label English fallback where a reviewed translation is not yet available.
- [x] Add CI regression checks for selectors, language persistence, RTL/LTR isolation and glossary coverage.
- [ ] Review translations with native readers and expand the reviewed glossary to STEM and story vocabulary.


## Context-aware dictionary meanings
- [x] Rank online dictionary definitions using words in the selected story sentence and chapter title.
- [x] Ignore common stop words so they do not dominate the match.
- [x] Show a clear ambiguity message when no definition has a meaningful context match instead of silently choosing the first dictionary sense.
- [x] Preserve the English source meaning so the selected learner language can translate it.
