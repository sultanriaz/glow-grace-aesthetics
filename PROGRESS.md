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

- [x] **Phase G: Blog Collection & RSS Feed**
  - [x] 6 evergreen educational articles in `src/content/blog/` (600–800 words, British English)
  - [x] Create `src/pages/blog/index.astro`
  - [x] Create `src/pages/blog/[slug].astro` (auto TOC, Article schema, related services)
  - [x] Create `src/pages/rss.xml.ts` via `@astrojs/rss` & RSS `<link>` in `BaseLayout.astro`

- [x] **Phase H: Integration, SEO, Performance & Quality Gates**
  - [x] Update `Header.astro`, `MobileNav.astro`, & `Footer.astro`
  - [x] Update `index.astro` (Blog teaser, appointment booking CTA) & `contact.astro`
  - [x] Normalise American spellings across Part 1 files to British English (43 replacements)
  - [x] Full quality gate verification:
    - `npm run check`: 0 errors, 0 warnings, 0 hints across 61 files
    - `npm test`: 14/14 Vitest unit tests passed
    - `npm run check:claims`: 0 banned medical claims
    - `node scripts/check-content.mjs`: Content audit clean
    - `node scripts/check-links.mjs`: 3,973 links audited, 0 broken links
    - `node scripts/verify-site.mjs`: 11 pages audited across 5 viewports (55 screenshots), 0 console errors, 0 third-party requests, 0 Axe a11y violations
    - `node scripts/run-lighthouse.mjs`: Performance 99-100, Accessibility 100, Best Practices 100, SEO 100
  - [x] Update `CONTENT_REVIEW.md` and commit locally on branch `part-2-content`

---

# Glow & Grace Aesthetics — Mission: Part 3 of 3 Progress
**Branch**: `part-3-launch`  
**Quality Bar**: Launch-ready, fast, secure, private by default, fully documented, and easy to hand over to a non-technical client.

## Part 3 Phase Checklist

- [ ] **Step 0: Reconnaissance & Environment Setup**
  - [x] Branch `part-3-launch` created and pushed to origin
  - [x] Baseline health verification passed (`check`, `test`, `build`, `check:claims`, `check:content`, `check:links`)
  - [x] Confirm no sample gallery/testimonial fixtures exist (`hasGallery()` and `hasTestimonials()` are false)
  - [x] Confirm all 23 services and 6 blog posts have `reviewStatus: "draft"`
  - [x] Update `PROGRESS.md`

- [x] **Phase A: Full Developer Page (/developer/)**
  - [x] Research developer portfolio at https://portfolio-cms-ten-beige.vercel.app/
  - [x] Save portfolio extraction summary in `docs/developer-page-sources.md`
  - [x] Update `src/data/developer.ts` with real projects, skills, and measured `siteStats`
  - [x] Capture portfolio preview screenshot at 1440x900, optimize to WebP (<= 120 KB)
  - [x] Build upgraded `/developer/` page (Hero, About, Selected Work, Skills, Portfolio Preview, About This Website, CTA)
  - [x] Verify robots `noindex`, sitemap exclusion, developer phone isolation (923229781129)

- [x] **Phase B: Legal Pages (/privacy/, /terms/, /medical-disclaimer/)**
  - [x] Create `src/data/site.ts` with real configuration flags
  - [x] Create `LegalLayout.astro` (readable measure, auto table of contents, "Last updated")
  - [x] Write Privacy Policy (`/privacy/`), Terms of Use (`/terms/`), Medical Disclaimer (`/medical-disclaimer/`)
  - [x] Link legal pages in footer and relevant form disclaimers; add to sitemap
  - [x] Update claims allowlist for negated guarantee phrases on legal pages

- [ ] **Phase C: Privacy-Friendly Analytics (Off by Default)**
  - [ ] Install `@vercel/analytics`
  - [ ] Create `src/utils/analytics.ts` with `track(name, props)` (no-op unless `PUBLIC_ANALYTICS_PROVIDER="vercel"`)
  - [ ] Add tiny delegated click listener (<= 1 KB) and `data-track-*` attributes
  - [ ] Create `docs/ANALYTICS.md`
  - [ ] Verify both analytics modes ("none" and "vercel") pass budgets, set zero cookies, and make zero 3rd-party requests

- [ ] **Phase D: Social Cards & SEO Polish**
  - [ ] Install `satori`, `@resvg/resvg-js`, `@fontsource/cormorant-garamond`, `@fontsource/jost`
  - [ ] Create `scripts/make-og.mjs` (1200x630 JPEG, <= 200 KB) generating OG cards for services, categories, posts, key pages
  - [ ] Update `Seo.astro` (per-page og:image, twitter:card, article timestamps, verification meta tags)
  - [ ] Add `lastmod` to sitemap in `astro.config.mjs`
  - [ ] Create `scripts/check-seo.mjs` (`npm run check:seo`)
  - [ ] Create `scripts/check-schema.mjs` (`npm run check:schema`)

- [ ] **Phase E: Security & Privacy Verification**
  - [ ] Add Content-Security-Policy (CSP) headers in `vercel.json`
  - [ ] Test zero CSP violations across routes, map facade, forms, and lightbox
  - [ ] Create `scripts/check-privacy.mjs` (`npm run check:privacy`)
  - [ ] Create `scripts/check-headers.mjs`
  - [ ] Create `docs/SECURITY.md`

- [ ] **Phase F: Performance, Accessibility & Cross-Browser QA**
  - [ ] Install `@playwright/test` and `@axe-core/playwright`
  - [ ] Configure `playwright.config.ts` (chromium, mobile chromium, webkit mobile, firefox)
  - [ ] Write `tests/e2e/smoke.spec.ts` and `tests/e2e/flows.spec.ts`
  - [ ] Write `tests/a11y/axe.spec.ts` (0 serious or critical violations)
  - [ ] Create `scripts/check-budgets.mjs` (`npm run check:budgets`)
  - [ ] Run Lighthouse mobile on 10 routes (Performance >= 95, Accessibility 100, Best Practices >= 95, SEO 100)

- [ ] **Phase G: Domain, Search Console & Local SEO Kit**
  - [ ] Create `docs/CUSTOM-DOMAIN.md`
  - [ ] Create `docs/LOCAL-SEO.md`
  - [ ] Install `qrcode` and create `scripts/make-qr.mjs` (`npm run make-qr`)
  - [ ] Create `marketing/README.md` and generate QR codes for website and WhatsApp

- [ ] **Phase H: Handover Docs, CI & Launch Gate**
  - [ ] Create `docs/HANDOVER.md`, `docs/EDITING-GUIDE.md`, `docs/MAINTENANCE.md`, `docs/LAUNCH-CHECKLIST.md`, `CHANGELOG.md`
  - [ ] Generate `docs/Client-Handover.pdf` via Playwright
  - [ ] Create `.github/workflows/ci.yml`
  - [ ] Add `npm run review:status` and `npm run launch:check`
  - [ ] Update `CONTENT_REVIEW.md`
  - [ ] Full quality gate verification and final commit & push on `part-3-launch`
