# Glow & Grace Aesthetics - Mission: Part 2 of 3 Progress

**Branch**: `part-2-content`  
**Quality Bar**: British English, Grade 8 reading level, plain language, ethical medical communication, zero unapproved claims, $\le$ 15 KB gzipped JS per page, zero third-party requests on page load, 100% WhatsApp/phone conversion focus.

---

## Phase Checklist

- [x] **Step 0: Reconnaissance & Environment Setup**
  - [x] Branch `part-2-content` created
  - [x] Install `@astrojs/rss` and dev dependency `vitest`
  - [x] Configure npm scripts (`test`, `check:claims`)
  - [x] Create `scripts/check-claims.mjs` and `scripts/claims-allowlist.json`
  - [x] Initialize `PROGRESS.md`

- [x] **Step 1: Utility & Data Model Extensions**
  - [x] Create `src/utils/tokens.ts` (`renderTokens` with clinic variables)
  - [x] Create `src/utils/visibility.ts` (`hasGallery`, `hasTestimonials`)
  - [x] Create `src/utils/booking.ts` (Appointment & bridal message builders, date validation)
  - [x] Write unit tests in `tests/utils.test.ts` & verify with `npm test`
  - [x] Update `src/content.config.ts` (services, blog, gallery, testimonials schemas)
  - [x] Update `src/data/categories.ts` (longIntro, concerns, 4 FAQs, hair journey)
  - [x] Create `src/data/bridal.ts` (`packages: []`)

- [x] **Phase A: Deep Content for all 23 Service Pages**
  - [x] Category: Hair (3 services: `hair-transplant`, `hair-fall-treatment`, `prp-hair-restoration`)
  - [x] Category: Skin (7 services: `melasma-treatment`, `microneedling-mesotherapy`, `mole-wart-removal`, `acne-scar-treatment`, `chemical-peels`, `dark-circles-under-eye`, `stretch-marks-scars`)
  - [x] Category: Facial (5 services: `hydrafacial`, `botox-lip-fillers`, `dermal-fillers-facial-contouring`, `anti-aging-treatments`, `bridal-glow-packages`)
  - [x] Category: Laser (4 services: `laser-hair-removal`, `electrolysis`, `carbon-pico-laser`, `tattoo-removal`)
  - [x] Category: Regenerative (2 services: `prp-therapy`, `exosome-therapy`)
  - [x] Category: Body (2 services: `weight-fat-reduction`, `whitening-drips`)
  - [x] Upgrade `src/pages/services/[slug].astro` template (sticky desktop in-page nav, sticky CTA sidebar, FAQ accordions + JSON-LD)

- [x] **Phase B: Category Landing Pages (6)**
  - [x] Create `src/pages/services/category/[slug].astro`
  - [x] Render hero, longIntro, concern chips, service cards, category FAQs with FAQPage JSON-LD, CtaBand
  - [x] Dedicated 5-step "Your hair journey" on `/services/category/hair/`
  - [x] Update navigation links (header dropdown, category tiles, footer)

- [x] **Phase C: FAQ Page**
  - [x] Create `src/pages/faq.astro` (Categorized accordions, progressive search filter, zero-JS accessible, FAQPage JSON-LD)

- [x] **Phase D: Appointment Request Page**
  - [x] Create `src/pages/book-appointment.astro`
  - [x] Accessible form: Full name, Service select with `<optgroup>`, Preferred Date, Preferred Time, Note
  - [x] Date validation (no past dates, no Sundays in `Asia/Karachi`), prefill from `?service=<slug>`, error summary

- [x] **Phase E: Bridal Experience Upgrade**
  - [x] Upgrade `bridal-glow-packages.md` with `extras: "bridal"`
  - [x] 4-step "Your bridal glow journey" path & "What can be part of a bridal plan" cards
  - [x] Interactive WhatsApp bridal planner
  - [x] 301 redirect `/bridal/` -> `/services/bridal-glow-packages/` in `vercel.json`

- [x] **Phase F: Gallery & Testimonials Systems**
  - [x] Create `src/pages/gallery.astro` (Hidden & noindex when empty, category filters, vanilla lightbox)
  - [x] Create `src/components/TestimonialGrid.astro`
  - [x] Test with temporary consented fixtures and verify empty state in production

- [ ] **Phase G: Blog Collection & RSS Feed**
  - [ ] 6 evergreen educational articles in `src/content/blog/` (600–800 words, British English)
  - [ ] Create `src/pages/blog/index.astro`
  - [ ] Create `src/pages/blog/[slug].astro` (auto TOC, Article schema, related services)
  - [ ] Create `src/pages/rss.xml.ts` via `@astrojs/rss` & RSS `<link>` in `BaseLayout.astro`

- [ ] **Phase H: Integration, SEO, Performance & Quality Gates**
  - [ ] Update `Header.astro` & `Footer.astro`
  - [ ] Update `index.astro` & `contact.astro`
  - [ ] Normalise American spellings across Part 1 files to British English
  - [ ] Full quality gate verification (`check`, `build`, `test`, `check:claims`, `check:content`, `check:links`, `verify-site`, `run-lighthouse`)
  - [ ] Update `CONTENT_REVIEW.md` and commit locally / push branch `part-2-content`
