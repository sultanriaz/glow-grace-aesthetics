# Glow & Grace Aesthetics — Content Editing & Operations Guide

This guide is designed for clinic administrators, marketing staff, and content editors to safely update clinic details, services, FAQs, and blog articles without breaking site functionality or design.

---

## 1. Updating Clinic Core Information

All foundational clinic details reside in a single configuration file:
**`src/data/clinic.ts`**

Never search and replace phone numbers or addresses across dozens of component files. Update this single file and the entire website (headers, footers, booking buttons, schema markup, and maps) updates automatically.

### A. Updating Phone & WhatsApp Numbers
Open `src/data/clinic.ts` and locate the `phone` object:
```typescript
phone: {
  display: "0313-4151471",      // Formatted number shown on screen
  e164: "+923134151471",        // International dialling link (tel:+923134151471)
  waNumber: "923134151471"      // Digits only used for WhatsApp api links
}
```

### B. Updating Clinic Hours
Locate the `hours` object:
```typescript
hours: {
  days: "Monday to Saturday",
  open: "10:00",
  close: "22:00",
  sunday: "Closed",
  timezone: "Asia/Karachi"
}
```

### C. Adding Doctor Profile & Credentials
When Dr. Tauqeer's verified bio and qualifications are finalized, update the `doctor` object in `src/data/clinic.ts`:
```typescript
doctor: {
  name: "Dr. Tauqeer",                      // Replace null with doctor's full name
  title: "Consultant Aesthetic Physician",  // Replace null with professional title
  bio: "Dr. Tauqeer has over 10 years of clinical experience in advanced dermatological aesthetics and hair restoration...",
  photo: "/images/doctor.webp",             // Path to optimized webp portrait
  qualifications: [
    "MBBS",
    "Certified in Aesthetic Medicine",
    "Member of International Society of Hair Restoration Surgery"
  ]
}
```

### D. Adding Social Media Links
When the clinic creates official social accounts, replace `null` with the full profile URLs:
```typescript
social: {
  facebook: "https://facebook.com/glowgracedk",
  instagram: "https://instagram.com/glowgracedk",
  tiktok: "https://tiktok.com/@glowgracedk",
  youtube: null // Leave null if not active
}
```

---

## 2. Managing Aesthetic Services

Service pages are stored as individual Markdown files inside:
**`src/content/services/`**

### A. Frontmatter Fields
Every service markdown file begins with frontmatter enclosed between `---` lines:
```markdown
---
title: "Hydrafacial Elite Treatment in DG Khan"
shortTitle: "Hydrafacial Elite"
slug: "hydrafacial"
category: "facial"
description: "Medical-grade hydradermabrasion for deep cleansing, extraction, and intensive skin hydration."
indications:
  - "Congested pores and blackheads"
  - "Dull, dehydrated skin"
  - "Uneven skin tone and rough texture"
duration: "45 to 60 minutes"
downtime: "None (zero downtime)"
anaesthesia: "None required"
reviewStatus: "draft"
---
```

### B. Medical Review Sign-off (`reviewStatus`)
- **`reviewStatus: "draft"`**: Indicates content has been drafted and is pending final clinical sign-off by the lead physician.
- **`reviewStatus: "approved"`**: Change to `"approved"` only once the clinic doctor has read and verified every clinical claim.

### C. Adding a New Service
1. Create a new `.md` file inside `src/content/services/` (e.g. `profhilo-treatment.md`).
2. Add the required frontmatter properties matching the existing schema.
3. Write the body sections using standard markdown headings (`## What Is ...`, `## How It Works`, `## Treatment Journey`, `## Aftercare & Recovery`, `## Frequently Asked Questions`).
4. Run `npm run check:claims` and `npm run check:links` to verify formatting and safety.

---

## 3. Publishing Blog Articles

Educational blog posts are located in:
**`src/content/blog/`**

### A. Article File Structure
Create a new file with a descriptive slug (e.g. `sunscreen-guide-pakistan-climate.md`):
```markdown
---
title: "Choosing the Right Sunscreen for Southern Punjab Summers"
slug: "sunscreen-guide-pakistan-climate"
publishDate: "2026-11-20"
excerpt: "A practical guide to broad-spectrum SPF protection during intense 45°C summers in DG Khan and Multan."
author: "Glow & Grace Clinical Team"
readingTime: "5 min read"
category: "Skin Care"
relatedServices:
  - "melasma-treatment"
  - "chemical-peels"
reviewStatus: "draft"
---

## Why Southern Punjab Sun Requires Broad-Spectrum Care
Body of the article written in clear, patient-friendly British English...
```

### B. Medical Content Rules
When writing blog articles:
- **Never promise 100% guarantees:** Avoid words like "cure", "permanent fix", "guaranteed results", "100% safe".
- **Acknowledge individual variation:** Use phrases like "results vary by skin type", "gradual improvement", "multi-session protocol".
- **Local relevance:** Address local environmental factors (intense sun exposure, arid dust, water hardness).

---

## 4. Activating Before/After Gallery & Patient Reviews

The website includes pre-engineered systems for patient galleries and testimonials. By default, both systems are hidden (`hasGallery() === false` and `hasTestimonials() === false`) to prevent publishing fake placeholders.

### A. Publishing Real Consented Before/After Photos
1. Obtain written, signed patient consent for public website display.
2. Optimize images to WebP format (`<= 200 KB`).
3. Add a markdown entry in `src/content/gallery/` (e.g. `patient-01-hair-prp.md`):
```markdown
---
title: "Hair Density Improvement After 4 PRP Sessions"
category: "hair"
beforeImage: "/gallery/hair-prp-before.webp"
afterImage: "/gallery/hair-prp-after.webp"
timeframe: "4 Months"
procedure: "PRP Hair Restoration"
consentConfirmed: true
---
```
4. As soon as the first consented entry is committed, the `/gallery/` navigation item, page, and filters automatically activate!

### B. Publishing Real Patient Testimonials
1. Add a markdown file in `src/content/testimonials/` (e.g. `fatima-k-hydrafacial.md`):
```markdown
---
patientName: "Fatima K."
treatment: "Hydrafacial Elite"
rating: 5
quote: "The clinic environment at Ghazi National Hospital was exceptionally clean and welcoming. My skin felt refreshed immediately."
date: "2026-11-10"
verified: true
---
```
2. The testimonial grid on the homepage and service pages will automatically render verified patient reviews.

---

## 5. Verification Checklist Before Publishing

Whenever you modify any content files, run this 60-second local terminal verification:

```powershell
# 1. Check for accidental banned medical claims
npm run check:claims

# 2. Verify all links and internal anchors work
npm run build
npm run check:links
```

If both commands return green success messages, your updates are ready to commit and deploy!
