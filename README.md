# Glow & Grace Aesthetics

> Production-grade, privacy-first, ultra-fast static website for **Glow & Grace Aesthetics** — a medical aesthetics and dermatology clinic located at YCDO Ghazi National Hospital, Multan Road, Dera Ghazi Khan, Pakistan.

---

## 🌟 Quality Highlights
- **100% Static & Blazing Fast**: Built with Astro 5 in strict static output mode (`output: "static"`).
- **Zero Third-Party Requests on Initial Load**: No external CDNs, tracker scripts, web fonts, or embedded trackers.
- **Privacy & Security Hardened**: Strict HTTP response headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, zero sensor permissions).
- **Self-Hosted Typography**: Latin subset of Cormorant Garamond (headings) & Jost (body/UI) via Fontsource.
- **Progressive Enhancement**: Completely functional with JavaScript disabled (fallback mobile menu and accessible anchor directories). Under 15 KB gzipped JS total.
- **Mobile First & Responsive**: Verified with zero horizontal scroll across 360px, 390px, 768px, 1024px, and 1440px viewports.
- **Medical Compliance**: Strictly conservative claims adherence ("may help", "aims to"), zero fabricated testimonials, and consultation disclaimers on every treatment.

---

## 🚀 Quick Start & Commands

```bash
# Install dependencies
npm ci

# Generate favicons, web manifest & OG image
npm run make-icons

# Start local development server
npm run dev

# Run TypeScript & Astro diagnostic check
npm run check

# Audit links & isolate developer contact numbers
npm run check:links

# Audit outstanding client TODOs and added services
npm run check:content

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
├── design-source/           # Source developer portrait asset
├── public/                  # Favicons, web manifest, robots.txt, social OG card
├── scripts/
│   ├── make-icons.mjs       # Automated icon, maskable PNG, and OG image generator
│   ├── check-links.mjs      # Internal link resolution & contact isolation audit
│   ├── check-content.mjs    # Client TODOs & added services scanner
│   ├── verify-site.mjs      # Automated Puppeteer responsive & a11y tester
│   └── run-lighthouse.mjs   # Mobile Lighthouse performance audit runner
├── src/
│   ├── assets/              # Brand assets & drop-in logo folder
│   ├── components/          # Reusable Astro UI components
│   ├── content/
│   │   └── services/        # 23 medical aesthetic service Markdown files
│   ├── content.config.ts    # Astro 5 content collection schema (Zod)
│   ├── data/                # Single source of truth data (clinic, developer, categories)
│   ├── layouts/
│   │   └── BaseLayout.astro # Core HTML structure, SEO meta & JSON-LD
│   ├── pages/               # Index, About, Services Hub, Service Detail, Contact, Developer, 404
│   ├── styles/              # Design tokens (tokens.css), base rules & utilities
│   └── utils/               # WhatsApp URL builders, Google Maps helpers, hours calculator, SEO
├── astro.config.mjs         # Astro configuration with sitemap filtering
├── vercel.json              # Vercel deployment headers & caching rules
├── CONTENT_REVIEW.md        # Client sign-off and verification checklist
└── README.md
```

---

## 🎨 Brand Identity & Logo Drop-in

The website currently renders a high-contrast geometric vector lockup (Mark + Cormorant Garamond 600 wordmark + Jost uppercase spaced tagline) styled after the clinic's motif.

### Dropping in the Official Logo:
1. Save your official logo file into `src/assets/brand/` as:
   - `logo.svg` (recommended vector)
   - `logo.png` (high-res transparent PNG)
   - `logo.webp`
2. Run `npm run make-icons` to regenerate favicons, app icons, and Open Graph previews.
3. Run `npm run build`.

The `Logo.astro` component detects the file automatically via `import.meta.glob`. **Zero code modifications required.**

---

## 🏥 Content Safety & Medical Compliance

- **No Medical Superlatives**: No guarantees, no promises of "permanent" results (phrased as "long-lasting"), and no painless/miracle marketing jargon.
- **Mole & Wart Precaution**: Mole removal copy explicitly advises clinical doctor evaluation for any changing lesion.
- **Doctor Consultation Notice**: Every service page emphasizes that treatment suitability is determined individually by the physician.
- **Zero Hallucinated Credentials**: All doctor biographical sections remain hidden in production until confirmed by the client in `src/data/clinic.ts`.

---

## 🚢 Vercel Deployment Instructions

Follow these click-by-click steps to deploy this repository to Vercel:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Part 1 production foundation"
   # Create a private repository on GitHub named 'glow-grace-aesthetics'
   git remote add origin https://github.com/<your-username>/glow-grace-aesthetics.git
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your Git provider and import `glow-grace-aesthetics`.
   - In **Project Settings**:
     - Framework Preset: `Astro`
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - In **Environment Variables**:
     - Name: `SITE_URL`
     - Value: `https://glow-grace-aesthetics.vercel.app` (or your registered custom domain).
   - Click **Deploy**.

---

## 🔭 Architecture & Extension Points (Parts 2 & 3)

This codebase is specifically architected to support future phases without refactoring:
- **Part 2 Extension Points**:
  - `src/content/services/*.md`: Frontmatter and Markdown schema support deep sections (FAQs, clinical contraindications, before/after galleries).
  - Booking Modal: Drop in an interactive scheduling calendar or multi-step booking form in `src/components/BookingForm.astro`.
  - Blog & Case Studies: Create `src/content/blog/` content collection alongside `services`.
- **Part 3 Extension Points**:
  - Custom Domain DNS: Update `SITE_URL` env variable in Vercel to reflect the apex domain.
  - Legal & Compliance: Add `/privacy/` and `/terms/` in `src/pages/`.
  - Content Security Policy (CSP): Add nonced or strict hash CSP in `vercel.json`.
