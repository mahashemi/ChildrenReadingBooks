# Reader Quality Taskboard

_Last updated: 2026-11-21_

Scope: improve the shared reading experience across every chapter and collection. Reading text always takes priority over decorative artwork. Preserve mobile/desktop layouts, word tapping, syllable modes, contextual meanings and narration behavior.

## Priority key
- **P0 — Release blocker:** visible broken functionality or incorrect reader state.
- **P1 — High:** core learning experience quality.
- **P2 — Follow-up:** broader curriculum and polish.

## Active work

| Priority | Task | Status | Acceptance criteria |
|---|---|---|---|
| P0 | Move all lesson SVGs behind the reading text | Implemented in PR #53; CI passed; browser review pending | Artwork is a low-contrast animated background; it consumes no vertical reading space, never covers words, and remains subtle on narrow phones. |
| P0 | Remove child-facing external activity links | Implemented in PR #53; CI passed | No external activity or source URLs render in the child reading pane; plain attribution and Qur’an cross-references remain. |
| P1 | Apply consistent vocabulary emphasis across all chapters | Implemented in PR #53; CI passed; visual review pending | New glossary words and key concepts use bold, varied colours; ordinary text stays calm; definitions, tapping and narration highlighting continue to work. |
| P1 | Respect reduced-motion preferences | Implemented in PR #53 | Background animation stops when the device requests reduced motion; reading and narration are unaffected. |
| P0 | Give desktop reading pane a comfortable viewport height | Implemented in PR #53 follow-up; CI/browser review pending | Normal desktop mode uses the available viewport height; the passage receives remaining card space; mobile layout is unchanged. |
| P0 | Make word-follow highlighting reliable in mobile Chrome | Implemented in PR #53 follow-up; CI/device review pending | Character offsets map to actual rendered word spans; estimated progress advances when boundary events are absent; pause/resume, speed changes and stop clear/restart fallback state safely. |
| P0 | Eliminate READING CHAPTER NaN | Fix merged; CI passed | Every page has a valid chapter index; defensive fallback never renders NaN. |
| P1 | Add regression validation for chapter metadata and media wiring | CI passed | CI checks registration order, chapter coverage, media references and fallback label logic. |
| P1 | Verify reader in Chrome and narrow mobile viewport | Pending | Artwork, paragraph flow, emphasis, audio and navigation are checked in a real browser. |

## Current design requirements
- [x] Keep all decorative SVGs behind the reading text; never add a top-of-page illustration row.
- [x] Ensure background artwork has low opacity, no hit targets, and no effect on text contrast or passage width.
- [x] Animate only decorative elements gently; support `prefers-reduced-motion` and do not compete with word-follow highlighting.
- [x] Use four coordinated vocabulary colours for every curated glossary word and stronger emphasis for key concepts; avoid colouring every ordinary word.
- [x] Remove activity/exploration links from child-facing reading pages while retaining factual source attribution separately.
- [ ] Verify at 320px, 375px, tablet and desktop widths; reading pane must remain the dominant visual element.
- [ ] Verify mobile Chrome narration on a physical device; confirm boundary-event fallback, pause/resume and speed changes.

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
