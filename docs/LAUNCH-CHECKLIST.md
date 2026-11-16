# Glow & Grace Aesthetics — Pre-Flight & Go-Live Launch Checklist

This checklist must be executed and initialled by clinic management and the technical lead prior to pointing live production DNS to the website.

---

## Pre-Flight Verification Sign-Off

### 1. Clinical Content & Medical Compliance
- [ ] **Clinical Review Sign-off:** Lead physician has reviewed all 23 service descriptions (`src/content/services/*.md`).
- [ ] **Blog Article Sign-off:** Lead physician has reviewed the 6 evergreen educational articles (`src/content/blog/*.md`).
- [ ] **Status Transition:** Run `npm run review:status` to inspect current draft states; transition signed-off files from `reviewStatus: "draft"` to `reviewStatus: "approved"`.
- [ ] **Doctor Profile:** Updated `src/data/clinic.ts` with Dr. Tauqeer's verified biography, medical qualifications, and clinical headshot (or confirmed keeping the placeholder until photo day).
- [ ] **Zero Unsubstantiated Claims:** Verified that `npm run check:claims` passes cleanly with zero prohibited medical guarantees.

### 2. Clinical Operations & Conversion Routing
- [ ] **WhatsApp Phone Number:** Verified that `phone.waNumber` in `src/data/clinic.ts` (`923134151471`) connects to the reception smartphone.
- [ ] **Test Message 1 (General Booking):** Clicked the main header "Book on WhatsApp" button on both an Android phone and an iPhone; confirmed message opens WhatsApp with pre-filled greeting.
- [ ] **Test Message 2 (Appointment Form):** Submitted a test request on `/book-appointment/`; confirmed structured WhatsApp message arrived at reception desk.
- [ ] **Test Message 3 (Bridal Planner):** Submitted a test bridal journey on `/services/bridal-glow-packages/`; confirmed structured timeline arrived at reception desk.
- [ ] **Direct Phone Call:** Verified that tapping the phone icon calls `0313-4151471` directly.
- [ ] **Hospital Location:** Confirmed physical address: *YCDO Ghazi National Hospital, Near Samina Chowk, Multan Road, DG Khan*.
- [ ] **Interactive Map Facade:** Tested clicking "Load Interactive Google Map" on `/contact/`; confirmed pin opens accurately.

### 3. Domain, SSL & Edge Hosting
- [ ] **Domain Purchased:** Secured primary domain (e.g. `glowgrace.pk` or `glowgraceaesthetics.pk`).
- [ ] **Vercel Linking:** Added domain and `www` alias to Vercel dashboard under project settings.
- [ ] **DNS Records Configured:**
  - A Record: `@` pointing to `76.76.21.21`
  - CNAME Record: `www` pointing to `cname.vercel-dns.com`
- [ ] **SSL / TLS Certificate:** Confirmed automatic Let's Encrypt SSL status shows active (green checkmark in Vercel).
- [ ] **Canonical Redirect:** Confirmed visiting `www.glowgrace.pk` automatically redirects (HTTP 301) to `https://glowgrace.pk/`.

### 4. Search Engine Optimization & Local Discovery
- [ ] **Google Search Console:** Verified domain property via DNS TXT record.
- [ ] **Sitemap Submission:** Submitted `https://glowgrace.pk/sitemap-index.xml` to Search Console.
- [ ] **Bing Webmaster Tools:** Imported verified Google Search Console profile.
- [ ] **Google Business Profile (GBP):** Matched clinic name, address, and phone number (NAP) exactly with website data.
- [ ] **Social Media Links:** Updated `src/data/clinic.ts` with official clinic Facebook/Instagram links once created.
- [ ] **Developer Isolation:** Verified `dist/` contains developer contact number (`923229781129`) solely on `/developer/`.

### 5. Privacy, Security & Performance Gate
- [ ] **Zero-Cookie Verification:** Confirmed site sets 0 tracking cookies and issues 0 third-party network requests on load.
- [ ] **Security Headers:** Verified strict Content Security Policy (CSP), HSTS, and frame protections pass with `npm run check:headers`.
- [ ] **Performance Budgets:** Confirmed all pages pass `npm run check:budgets` (< 15 KB JS, < 40 KB HTML, < 30 KB CSS).
- [ ] **Mobile Lighthouse Score:** Verified 95+ Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.

### 6. Physical Marketing Collateral
- [ ] **Print QR Codes Generated:** Ran `npm run make-qr` using the final production URL.
- [ ] **Reception Standees:** Delivered QR code acrylic standees to front desk.
- [ ] **Appointment Cards:** Printed physical appointment cards featuring WhatsApp booking QR code.

---

## Final Launch Gate Execution

Run the unified launch gate script from the project root:

```powershell
npm run launch:check
```

**Sign-off Criteria:** 
The command must output `All Launch Gate checks passed cleanly. Ready for production release!`
