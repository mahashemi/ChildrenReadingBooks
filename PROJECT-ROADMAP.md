# Little Lanterns — Live Project Status & Roadmap

_Last updated: 2026-11-27_

## Product direction
A warm, responsive, English-first reading and Islamic learning experience for children. Original Qur'an, hadith and dua texts remain distinct from child-friendly explanations, reflections and original memory aids. Preserve the mobile experience while making desktop layouts spacious and useful.

## Delivered in this workstream
- Complete core Sahifa source-import pipeline for all 54 numbered supplications.
- Separate Rhymes tab using the shared reader/narration visual language.
- Desktop word meaning pane positioned to the right of the passage; touch layouts retain the stacked presentation.
- Dedicated About & Sources tab with translation, distribution and courtesy credits.
- Added the child-friendly science chapter “The Amazing Journey of Paper”, following plant fibres through pulping, sheet formation, drying and recycling.
- Made reading-library filter totals derive from the live chapter registry, including all 54 imported Sahifa supplications; removed the stale fixed 21-chapter accessibility label.
- Structured JSON corpus with stable IDs, source traceability and paragraph chunk IDs for future RAG.
- Live roadmap and editorial source register.

## Sahifa corpus scope

**Latest import check (2026-11-09):** CI extracted all 54 core supplications and validated 39,851 words from the credited English-only PDF. Editorial introductions are stored separately from the prayer text, and original paragraph breaks are preserved. Manual item-by-item comparison against the PDF remains open.
| Collection | Target | Status |
|---|---:|---|
| Core Sahifa supplications | 54 | Importer requires all 54 sequential items with non-empty text |
| Supplementary addenda | 14 in a commonly used expanded arrangement | Not imported; separate collection |
| Munajaat | 15 | Not imported; separate collection |
| Further Sahifas | Varies by compilation | Provenance research required |

Never combine addenda or Munajaat into the core 54 count. A dua is complete only when its full text is imported and source-checked.

## Data standards
Each core dua record includes stable ID, collection ID, ordinal, source title, English language, complete-translation content type, ordered paragraphs, full text, word count, paragraph chunk IDs, source page/PDF URLs, attribution and permission status. Keep learning notes, themes, Qur'anic references, legal connections, meanings and rhymes separate from the translation.

## Roadmap

**Active reader-quality board:** [docs/READER-QUALITY-TASKBOARD.md](docs/READER-QUALITY-TASKBOARD.md). P0 reader bugs and P1 visual emphasis are tracked there.


### Shared reading experience — all chapters and supplications
- [x] Automatically pronounce the selected word when its meaning modal opens; provide a separate speaker icon to replay the word.
- [x] Replace the cramped inline word-meaning panel with a responsive native dialog for touch and desktop.
- [x] Make definition audio explicit: tapping a word opens its meaning; the speaker button reads the definition, not the word.
- [x] Support close button, Escape, backdrop click, focus return and speech cancellation when the dialog closes.
- [ ] Verify the meaning dialog and audio in desktop and mobile browsers, including a physical phone.
- [x] Keep the passage as the primary visual element on mobile and desktop.
- [x] Keep the reading pane text-only; show local SVG concept illustrations on demand in an animated modal with reduced-motion support.
- [x] Remove child-facing activity and external source links from the reading pane while retaining source attribution text.
- [x] Emphasize curated glossary words and key concepts with bold, varied colours without changing word interaction or narration highlighting.
- [x] Expand the normal desktop reader to use the available viewport height; the passage stage receives the remaining card space.
- [x] Map narration character offsets to rendered word spans and provide estimated progress when speech boundary events are absent.
- [ ] Verify at 320px, 375px, tablet and desktop widths in a real browser, including mobile Chrome narration on a physical device.

### Little Scientists — preschool STEM collection
- [x] Add six original, short-sentence STEM chapters: quantum physics, Space ABC, scientific discovery, robots and AI, DNA, and exoplanets.
- [x] Add page-specific local SVG illustrations.
- [x] Move chapter SVGs out of the reading pane into the on-demand Concepts modal; no artwork obscures reading text.
- [x] Remove child-facing activity/exploration links from the reading pane; retain source attribution as plain text and keep source URLs out of child-facing chapter notes.
- [x] Apply colourful, bold glossary/key-concept emphasis through the shared paragraph renderer across stories and supplications.
- [ ] Expand contextual vocabulary and learner-language translations for new STEM terms.
- [ ] Review with a six-year-old early reader and tune sentence length, word difficulty and narration pacing.
- [ ] Add more source-checked STEM adventures: climate, ocean technology, renewable energy, medical imaging and materials science.


### Now — complete Sahifa reader
- [x] Establish a source-driven import path for all 54 core supplications.
- [x] Add dedicated attribution/About tab.
- [x] Move memory rhymes out of the original dua reader.
- [x] Add a desktop right-side word meaning pane without changing touch layout.
- [ ] Review extracted text against the source PDF and individual pages, including footnotes and page-break artefacts.
- [ ] Verify all 54 reader routes, pagination, search and narration after deployment.
- [ ] Add source-checked learning notes and Qur'anic connections for all 54.

### Next — Rhymes and meanings
- [x] Move the four existing Sahifa memory rhymes into the dedicated Rhymes tab; keep them out of the supplication reader.
- [ ] Create age-appropriate original memory rhymes for the remaining duas; label each as a learning aid.
- [ ] Expand the meaning pane with contextual definitions, verified roots/transliteration and source links.
- [ ] Add a parent/teacher detail mode while keeping the child view uncluttered.

### Later — supplementary collections
- [ ] Add the 14 addenda separately after item-by-item provenance review.
- [ ] Add the 15 Munajaat as a separate collection, not as part of the core 54.
- [ ] Research other Sahifa compilations and avoid double-counting overlaps.

### Future platform and retrieval
- [ ] Add offline-first content caching and schema version migration.
- [ ] Add a content export/API for semantic search and RAG ingestion.
- [ ] Add retrieval metadata: themes, source spans, verified references, editorial status and review history.
- [ ] Consider a source-grounded conversational explanation panel with child-safety design.
- [ ] Continue Android/Capacitor compatibility checks.

## Verification
CI generates the corpus and fails unless all 54 numbered items have non-empty text. JSON is canonical for machine use; the browser consumes the generated runtime binding. Browser/device verification is tracked separately from syntax and CI checks.


- Paper-making chapter includes a Qur’an 6:99 reflection: gratitude for Allah’s gifts of water and plant life, learning how creation works, and using resources responsibly.


- 2026-11-22: PR #53 follow-up adds a viewport-filling desktop reading card and mobile narration highlighting fallback with exact rendered-word offsets. GitHub Actions validation passed; physical-device/browser review remains pending.

- 2026-11-22: Added a responsive native word-meaning dialog with explicit definition audio, keyboard dismissal, backdrop dismissal, focus restoration and automated regression checks. Browser/device verification remains open.


- 2026-11-22: Expanded The Little Scientist’s Discovery Primer with a safe, household paper-bridge experiment. Learners make a prediction, compare flat and folded paper under the same conditions, count results, record evidence and repeat the test. Automated regression assertions added; PR/browser review pending.


- 2026-11-27: Following the repository rename to LittleLanternsBooks, the reading pane has been made fully text-only to remove corner artwork that competed with the passage. A Concepts button beside Chapters opens an accessible, responsive modal showing the current page's illustration with gentle motion and key concepts from its text. Automated regression checks added; PR #57 merged, CI and GitHub Pages deployment passed; physical browser/device review pending.


## Reader polish — narrated concept explorer
The Concepts dialog now presents distinct chapter illustrations as a navigable sequence. Each slide has a short spoken explanation, replay control and child-friendly next/back navigation. Reader settings remain anchored at the far right of the chapter/concepts toolbar. Physical-device visual review remains outstanding.


### Learner language — first release
- [x] Add English, Arabic, Persian and Urdu interface selection.
- [x] Preserve English reading passages in left-to-right layout when the surrounding interface uses RTL.
- [x] Add 15 curated trilingual paper-making glossary entries and a clear English fallback for terms not yet reviewed.
- [ ] Expand reviewed translations across STEM and story vocabulary; validate wording with native readers before marking the corpus complete.


### Context-aware vocabulary meanings
- [x] Prefer dictionary senses that match the selected word's story sentence and chapter context.
- [x] Avoid guessing when several meanings are possible; tell the learner to use the sentence and ask a grown-up.
- [ ] Expand offline, reviewed meanings and trilingual translations across all reading chapters.


### Trilingual STEM vocabulary
- [x] Add 22 curated Arabic, Persian and Urdu meanings for core terms in physics, astronomy, robotics, biology and scientific inquiry.
- [ ] Native-reader review and expansion to the remaining STEM and story vocabulary.


### Full key-concept translation coverage
- [x] Add Arabic, Persian and Urdu meanings for the current key-concept set, including plural and compound science terms.
- [ ] Native-reader review and future vocabulary expansion.


### Spoken English — active learning priority
- [x] Replace the placeholder speech-stage button with a working speaking studio: topic prompts, optional browser speech-to-text, editable transcript, sentence frames, model audio and supportive feedback.
- [x] Provide typed-answer fallback where speech recognition is unavailable and disclose browser microphone processing.
- [ ] Add chapter-specific speaking tasks: retell the story, explain a key concept, give a reason and example, and share a personal reflection.
- [ ] Test with real children and caregivers; tune prompts, recognition behavior and feedback for ages 7–9.

- [x] Connect each reading page to the speaking studio with a prompt grounded in that chapter's title, category and takeaway.
