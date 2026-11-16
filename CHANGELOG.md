# Changelog

All notable changes to the **Glow & Grace Aesthetics** website will be documented in this file.

The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-16 (Mission Part 3: Launch Readiness)

### Added
- **Comprehensive Developer Profile (`/developer/`):**
  - Built an executive, 7-section portfolio page showcasing developer expertise, technical architecture, and verified metrics from `https://portfolio-cms-ten-beige.vercel.app/`.
  - Added optimized portfolio preview screenshot (40 KB WebP) and developer portrait.
  - Implemented strict isolation of developer contact number (`923229781129`) solely to `/developer/`, with `noindex` robots directive and sitemap exclusion.
- **Legal Compliance Suite:**
  - Created `LegalLayout.astro` with high-readability typography, automatic section table of contents, and "Last updated" timestamps.
  - Authored comprehensive legal policies in British English:
    - Privacy Policy (`/privacy/`) with zero-cookie disclosures, WhatsApp data handling, and patient rights.
    - Terms of Service (`/terms/`) covering clinic booking policies, consultation ethics, and clinic etiquette.
    - Medical Disclaimer (`/medical-disclaimer/`) stating that aesthetic consultations are individualised and informational.
  - Updated footer navigation with direct legal links and updated appointment form submission notes.
- **Privacy-Friendly Web Analytics (`@vercel/analytics`):**
  - Integrated zero-cookie, GDPR/DNT/GPC-compliant analytics utility (`src/utils/analytics.ts`), disabled by default (`PUBLIC_ANALYTICS_PROVIDER="none"`).
  - Attached delegated click listener (< 1 KB) tracking CTA conversions (`whatsapp_click`, `phone_call_click`, `appointment_form_submit`, `bridal_planner_submit`, `map_load_click`).
  - Authored comprehensive documentation in `docs/ANALYTICS.md`.
- **Automated Social Share (OG) Card Generation:**
  - Implemented `scripts/make-og.mjs` using `satori`, `@resvg/resvg-js`, and `sharp` to automatically generate branded 1200x630 JPEG social preview images (40–69 KB each).
  - Generated social cards for all 48 pages (home, 23 services, 6 categories, 6 blog posts, FAQ, booking, bridal, contact, legal).
  - Updated `Seo.astro` to dynamically inject per-page Open Graph and Twitter Card tags.
  - Added automated sitemap `lastmod` timestamps in `astro.config.mjs`.
  - Created validation scripts `scripts/check-seo.mjs` (0 errors) and `scripts/check-schema.mjs` (117 schemas validated, 0 errors).
- **Security Hardening & Content Security Policy (CSP):**
  - Configured strict HTTP response headers in `vercel.json` (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
  - Created automated verification scripts `scripts/check-privacy.mjs` and `scripts/check-headers.mjs`.
  - Authored security runbook in `docs/SECURITY.md`.
- **End-to-End & Automated Accessibility QA:**
  - Installed Playwright (`@playwright/test`) and Axe Core (`@axe-core/playwright`).
  - Added automated test suites:
    - `tests/e2e/smoke.spec.ts`: 32 routes verified across 3 browser engines (Chromium, Mobile Chrome, Mobile Safari).
    - `tests/e2e/flows.spec.ts`: End-to-end user interactions verified (booking form validation, bridal planner WhatsApp generation, FAQ search filtering, mobile navigation drawer).
    - `tests/a11y/axe.spec.ts`: WCAG 2.1 AA automated accessibility audit across all core templates (0 critical or serious violations).
  - Implemented `scripts/check-budgets.mjs` enforcing strict performance budgets (0 breaches across all 132 build files).
  - Conducted mobile Lighthouse audit across 10 representative routes (Performance 99–100, Accessibility 100, Best Practices 100, SEO 100) documented in `docs/LIGHTHOUSE-REPORT.md`.
- **Domain, Search Console & Local Marketing Kit:**
  - Authored step-by-step custom domain DNS runbook in `docs/CUSTOM-DOMAIN.md`.
  - Authored local SEO and Google Business Profile strategy in `docs/LOCAL-SEO.md`.
  - Implemented `scripts/make-qr.mjs` generating print-ready, high-redundancy QR codes (SVG & 1024x1024 PNG) for website, WhatsApp, and Google Maps in `marketing/`.
  - Authored print collateral instructions in `marketing/README.md`.
- **Client Handover & Unified Quality Gate:**
  - Authored executive handover documentation: `docs/HANDOVER.md`, `docs/EDITING-GUIDE.md`, `docs/MAINTENANCE.md`, `docs/LAUNCH-CHECKLIST.md`.
  - Created GitHub Actions CI workflow in `.github/workflows/ci.yml`.
  - Added `npm run review:status` to inspect clinical draft statuses.
  - Created unified launch gate script `scripts/launch-check.mjs` (`npm run launch:check`).

---

## [0.2.0] - 2026-11-16 (Mission Part 2: Content Depth and Conversion)

### Added
- **Comprehensive Clinical Service Catalog (23 Services):**
  - Authored deep, structured content across 6 medical categories: Hair (3), Skin (7), Facial (5), Laser (4), Regenerative (2), Body (2).
  - Standardised clinical architecture: What it is, How it works, Indications, Candidacy, Step-by-step journey, Recovery, and Treatment FAQs.
- **Category Landing Hubs (6 Categories):**
  - Built dedicated landing pages for each treatment category (`/services/category/[slug]/`) with concern filters, procedure grids, and category FAQs.
  - Engineered dedicated 5-step interactive "Your Hair Journey" on `/services/category/hair/`.
- **Central Patient FAQ (`/faq/`):**
  - Created categorised accordion FAQ system with zero-dependency progressive search filtering and complete FAQPage JSON-LD.
- **Static Appointment Request Engine (`/book-appointment/`):**
  - Built accessible appointment request form with client-side date validation (excluding past dates and Sundays in `Asia/Karachi`).
  - Pre-fills requested service and converts user input into a formatted WhatsApp message.
- **Interactive Bridal Glow Experience:**
  - Upgraded `/services/bridal-glow-packages/` with a month-by-month preparation journey and interactive WhatsApp planner.
- **Consented Patient Gallery & Testimonial Architecture:**
  - Engineered safe, consented media systems (`/gallery/` and `TestimonialGrid.astro`) with empty-state safeguards (`hasGallery() === false`).
- **Educational Medical Blog & RSS Feed:**
  - Authored 6 evergreen educational articles in British English adhering to plain-language medical communication standards.
  - Generated automated RSS feed at `/rss.xml`.
- **Medical Claim Safety Engine:**
  - Created `scripts/check-claims.mjs` and `scripts/claims-allowlist.json` to prevent prohibited marketing claims.

---

## [0.1.0] - 2026-11-15 (Mission Part 1: Architecture and Foundation)

### Added
- **Core Project Foundation:**
  - Scaffolded Astro v5 static site generator with strict TypeScript configuration and zero external UI libraries.
  - Configured custom luxury design token architecture (`tokens.css`) using clinical brand palette (Emerald, Sand, Cream, Charcoal).
  - Self-hosted web fonts via Fontsource (`Cormorant Garamond` and `Jost`).
- **Shared Components & Layouts:**
  - Built semantic, accessible components: `Header`, `Footer`, `MobileNav`, `Button`, `SectionHeading`, `ServiceCard`, `CtaBand`, `Breadcrumbs`, `MapFacade`, `Seo`, `JsonLd`.
  - Configured responsive mobile-first navigation with sticky top bar and bottom quick-action bar for WhatsApp/Phone calls.
- **Core Pages:**
  - Homepage (`/`) with hero, service highlights, clinic intro, process steps, and location preview.
  - About Us (`/about/`) establishing clinic safety protocols and clinical approach.
  - Services Hub (`/services/`) listing all 23 aesthetic procedures.
  - Contact Page (`/contact/`) with privacy-preserving Google Maps facade.
  - Custom 404 Error Page (`/404/`).
  - Initial Developer Page (`/developer/`).
