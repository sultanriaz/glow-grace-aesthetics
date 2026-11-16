# Glow & Grace Aesthetics — Content Review & Client Sign-off Document

This document lists all items requiring verification and sign-off by the clinic management of **Glow & Grace Aesthetics** before official domain launch.

---

## 1. Doctor & Clinical Leadership Information
Currently, all doctor information in `src/data/clinic.ts` is gracefully omitted in production.
Please provide the following verified details:
- [ ] **Full Name**: e.g., Dr. [Full Name]
- [ ] **Medical Title / Designation**: e.g., Consultant Dermatologist & Aesthetic Physician
- [ ] **Qualifications & Medical Degrees**: e.g., MBBS, FCPS / Dip Derm
- [ ] **Professional Biography**: 2–3 sentences highlighting medical focus and clinical philosophy.
- [ ] **High-Resolution Portrait**: Clean, professional medical headshot (stored in `src/assets/developer/` or client folder).

---

## 2. Contact & Communication Channels
- [ ] **Phone & WhatsApp Number**: Confirm that `0313-4151471` (`+92 313 4151471`) is active for both incoming voice calls and WhatsApp business messaging.
- [ ] **Operating Schedule**:
  - Monday – Saturday: 10:00 AM – 10:00 PM (10:00 to 22:00 PKT).
  - Sunday: Closed.
  - Please confirm if Friday prayer break or lunch timings need to be reflected.

---

## 3. Physical Address & Map Pin Location
- [ ] **Facility Location**:
  - Address Line 1: `YCDO Ghazi National Hospital`
  - Address Line 2: `Near Samina Chowk, Multan Road`
  - City / District: `Dera Ghazi Khan` (`DG Khan`), Punjab, Pakistan
- [ ] **Google Maps Pin**: Confirm if the Google Map query `"YCDO Ghazi National Hospital, Samina Chowk, Multan Road, Dera Ghazi Khan"` points directly to the clinic entrance or if a dedicated Google Maps Place ID / Plus Code is preferred.

---

## 4. Audit of the 8 "Added" Services
15 services were directly specified in the clinic's initial treatment list. 8 additional foundational services were added to provide a complete, competitive aesthetic offering. Please confirm each of the following:

1. **Hair Transplant** (`hair-transplant.md`): Confirm whether FUE / surgical follicle restoration is offered at this facility.
2. **Hair Fall Treatment** (`hair-fall-treatment.md`): Clinical scalp analysis and medical hair fall therapy.
3. **PRP for Hair** (`prp-hair-restoration.md`): Autologous platelet-rich plasma scalp injections.
4. **Acne & Acne Scar Treatment** (`acne-scar-treatment.md`): Chemical peels, subcision, and scar revision.
5. **Chemical Peels** (`chemical-peels.md`): Medical-grade alpha/beta hydroxy acid resurfacing.
6. **Dark Circles & Under-Eye Care** (`dark-circles-under-eye.md`): Periorbital hydration and pigment care.
7. **Stretch Marks & Scar Treatment** (`stretch-marks-scars.md`): Collagen-induction remodeling for striae.
8. **Dermal Fillers & Facial Contouring** (`dermal-fillers-facial-contouring.md`): Hyaluronic acid contouring for cheeks, jawline, and chin.

---

## 5. Claim-Sensitive Treatments (Compliance & Medical Safety)
Medical regulations strictly prohibit promising guaranteed or permanent results. Please review the conservative clinical phrasing implemented for:
- [ ] **Whitening Drips** (`whitening-drips.md`): Framed as physician-supervised antioxidant IV infusions (glutathione and vitamin C) supporting cellular defense; avoids unrealistic whitening claims.
- [ ] **Weight & Fat Reduction** (`weight-fat-reduction.md`): Framed as non-surgical localized body contouring and silhouette shaping; emphasizes diet/lifestyle synergy rather than obesity cures.
- [ ] **Botox & Lip Fillers** (`botox-lip-fillers.md`): Emphasizes conservative doctor placement preserving natural expressions; avoids specific brand or drug names.
- [ ] **Tattoo Removal** (`tattoo-removal.md`): Framed as selective photoacoustic laser fading over multiple sessions; avoids claims of instant or 100% scar-free ink elimination.

---

## 6. Brand Logo File Drop-In
- [ ] The website currently displays a custom, mathematically balanced brand lockup based on your description (open circular arc, three-leaf sprig, sand crescent, Cormorant Garamond serif wordmark, and Jost spaced tagline).
- [ ] To replace this with the official logo file: simply drop `logo.svg`, `logo.png`, or `logo.webp` into `src/assets/brand/` and run `npm run make-icons`. The website updates everywhere automatically with zero code modifications.

---

## 7. Official Social Media Channels
Please provide live URLs for:
- [ ] Facebook Page
- [ ] Instagram Profile
- [ ] TikTok Profile
- [ ] YouTube Channel

---

## 8. Custom Domain & Production Deployment
- [ ] **Staging Fallback URL**: `https://glow-grace-aesthetics.vercel.app`
- [ ] **Target Custom Domain**: e.g., `glowandgrace.pk` or `glowgraceclinic.com`
- [ ] Once purchased, configure DNS CNAME / A records in Vercel and update the `SITE_URL` environment variable.
