# Reader Quality Taskboard

_Last updated: 2026-11-21_

Scope: improve the reading experience after the Little Scientists collection was added. Preserve the existing mobile/desktop layout, word tapping, syllable modes and narration behavior.

## Priority key
- **P0 — Release blocker:** visible broken functionality or incorrect reader state.
- **P1 — High:** core learning experience quality.
- **P2 — Follow-up:** broader curriculum and polish.

## Active work

| Priority | Task | Status | Acceptance criteria |
|---|---|---|---|
| P0 | Restore STEM lesson illustrations | In progress | All 19 STEM pages show their matching local SVG illustration, caption and optional grown-up link on desktop and mobile. |
| P0 | Eliminate READING CHAPTER NaN | In progress | Every page has a valid chapter index; defensive fallback never renders NaN. |
| P1 | Add child-friendly emphasis to key concepts | In progress | Curated learning words are bold and colored; words remain tappable and narration highlighting still works. |
| P1 | Add regression validation for chapter metadata and media wiring | Planned | CI checks registration order, chapter coverage, media references and fallback label logic. |
| P1 | Verify reader in Chrome and narrow mobile viewport | Pending | Artwork, paragraph flow, emphasis, audio and navigation are checked in a real browser. |

## Root-cause findings
- [x] **Metadata registration order identified:** metadata was assigned before the six STEM chapters were appended. Their pages therefore had no chapterIndex, chapterPage, chapterLength or chapterMedia.
- [x] **Illustration dependency identified:** the SVG panel reads chapterMedia; missing metadata kept it hidden even though the SVG file and references existed.
- [x] **NaN cause identified:** the reader tag directly added one to an undefined chapterIndex.

## Fix tracking
- [ ] Move metadata registration after all chapters and pages—including STEM—are registered.
- [ ] Add a defensive chapter-label fallback.
- [ ] Apply key-concept styling without replacing or wrapping narration tokens.
- [ ] Run JavaScript syntax and STEM media validation.
- [ ] Verify CI and GitHub Pages deployment after merge.

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
- 2026-11-21: Created board; confirmed that the metadata assignment ran before the newly appended STEM chapters.
