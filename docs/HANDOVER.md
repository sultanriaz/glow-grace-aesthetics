# Glow & Grace Aesthetics — Executive Handover Document

**Clinic Name:** Glow & Grace Aesthetics  
**Location:** YCDO Ghazi National Hospital, Near Samina Chowk, Multan Road, Dera Ghazi Khan (DG Khan), Punjab, Pakistan  
**Primary Contact:** 0313-4151471 (+92 313 4151471)  
**Primary Online Booking:** WhatsApp Direct (`https://wa.me/923134151471`)  
**Website Architecture:** Jamstack Static Site Generator (Astro v5) deployed on Vercel Global Edge  
**Handover Date:** November 2026  
**Document Version:** 1.0.0 (Production Release)

---

## 1. Executive Summary & Project Overview

This website has been custom-engineered for **Glow & Grace Aesthetics** as a premier, high-performance static web presence serving Dera Ghazi Khan and the broader Southern Punjab region.

### Core Objectives Delivered
1. **Direct Patient Acquisition:** Instant conversion to WhatsApp bookings and direct phone consultations without intermediary booking commissions or complex account registration.
2. **Clinical Trust & Regulatory Compliance:** Clear, plain-language medical descriptions adhering strictly to ethical medical advertising guidelines (no deceptive guarantees, no unverified statistics, no stock doctor imagery).
3. **Flawless Mobile Experience:** Sub-second page loads over local 4G mobile networks, zero tracking cookies, zero external font CDNs, and lightweight page weights (< 15 KB JavaScript per page).
4. **Autonomous Client Ownership:** The clinic possesses 100% intellectual property, source code, assets, and hosting accounts with zero ongoing platform lock-in.

---

## 2. Technology Stack & Architecture

| Architectural Layer | Technology Selected | Rationale & Clinical Advantage |
| :--- | :--- | :--- |
| **Static Framework** | **Astro v5 (SSG)** | Pre-renders 100% of HTML at build time. Zero server-side rendering lag, zero database vulnerability, zero SQL injection risk. |
| **Language & Typing** | **TypeScript (Strict)** | Compile-time guarantee of type safety across all clinic data models, content collections, and navigation schemas. |
| **Styling System** | **Hand-Crafted CSS Design Tokens** | Custom luxury palette (Deep Emerald `#03422F`, Warm Sand `#C69A5C`, Clean Cream `#FAF8F5`). Zero bulky CSS frameworks (no Tailwind or Bootstrap bloat). |
| **Client Scripting** | **Vanilla ES Modules** | Less than 15 KB gzipped total client script footprint per route. Instant responsiveness on mid-range Android devices. |
| **Typography** | **Self-Hosted Fontsource** | Cormorant Garamond (Editorial Serif) & Jost (Clean Geometric Sans). Zero round-trips to Google Fonts; 100% GDPR/privacy compliant. |
| **Hosting & CDN** | **Vercel Global Edge** | Automatic HTTPS, worldwide CDN caching, instant git-driven preview deployments, and sub-100ms time-to-first-byte (TTFB). |
| **Privacy & Analytics** | **Vercel Web Analytics (Off by default)** | Zero tracking cookies, fully compliant with Do-Not-Track (DNT) and Global Privacy Control (GPC). |

---

## 3. Digital Asset & Credentials Inventory

Before going live, ensure the clinic management retains and documents access to the following master accounts:

| Asset / Service | Provider / URL | Ownership Role | Status / Action Required |
| :--- | :--- | :--- | :--- |
| **Domain Registration** | PKNIC (`.pk`) or Registrar | Clinic Management | Secure `glowgrace.pk` or `glowgraceaesthetics.pk` (See `docs/CUSTOM-DOMAIN.md`). |
| **DNS & Edge Hosting** | Vercel (`vercel.com`) | Clinic Management / Developer | Production project `glow-grace-aesthetics` linked to GitHub repository. |
| **Source Code Repository** | GitHub (`github.com/sultanriaz/...`) | Developer / Clinic Archive | Version-controlled codebase containing all commits, tests, and documentation. |
| **Clinic WhatsApp Business** | WhatsApp Business (`0313-4151471`) | Clinic Reception / Patient Coordinator | Installed on clinic reception smartphone with auto-greeting configured. |
| **Google Business Profile** | Google Maps / GBP | Clinic Management | Verified profile at YCDO Ghazi National Hospital (See `docs/LOCAL-SEO.md`). |
| **Google Search Console** | Google Search Console | Clinic Management / Webmaster | Domain property verified via DNS TXT record for automated indexation. |

---

## 4. Key Documentation Index

The following dedicated runbooks are available in the repository root and `/docs` directory:

1. **`docs/EDITING-GUIDE.md`**: Step-by-step instructions for non-technical staff to update clinic hours, phone numbers, add new services, or publish blog articles.
2. **`docs/CUSTOM-DOMAIN.md`**: Complete runbook for connecting custom `.pk` domains, setting DNS records on Vercel, and configuring redirects.
3. **`docs/LOCAL-SEO.md`**: Guide for optimizing Google Business Profile, local citations, and regional keyword visibility across Southern Punjab.
4. **`docs/ANALYTICS.md`**: Privacy-first analytics architecture, event tracking specification, and instructions for activating Vercel Analytics.
5. **`docs/SECURITY.md`**: Content Security Policy (CSP) specifications, zero-tracker verification, and security response procedures.
6. **`docs/LAUNCH-CHECKLIST.md`**: Pre-flight checklist to execute immediately prior to pointing production DNS records.
7. **`docs/MAINTENANCE.md`**: Long-term technical maintenance, dependency updating, and disaster recovery procedures.
8. **`CONTENT_REVIEW.md`**: Medical claims review status tracker documenting clinic sign-off status for all 23 services and 6 blog posts.

---

## 5. Roles & Ongoing Responsibilities

### Clinic Management & Reception Team
- **WhatsApp Inbox Monitoring:** Triage patient inquiries originating from the website booking form and CTA buttons.
- **Appointment Scheduling:** Confirm appointment dates and times directly with patients on WhatsApp or via telephone (`0313-4151471`).
- **Medical Sign-Off:** Review clinical procedure descriptions and blog articles before switching `reviewStatus` from `"draft"` to `"approved"` (See `CONTENT_REVIEW.md`).
- **Google Reviews Management:** Request happy patients scan the reception desk QR code or send direct review links via WhatsApp.

### Technical Webmaster / Developer
- **Dependency Upgrades:** Periodically run `npm audit` and update Astro minor dependencies.
- **Domain Renewal:** Ensure domain registrations (`.pk` or `.com`) are renewed annually before expiration.
- **Edge Deployment Monitoring:** Verify automated Vercel preview builds pass CI before merging updates to `main`.

---

## 6. Support & Emergency Escalation

For code maintenance, infrastructure reconfiguration, or technical support:

- **Lead Engineer:** Sultan Riaz  
- **Developer Portfolio:** [https://portfolio-cms-ten-beige.vercel.app/](https://portfolio-cms-ten-beige.vercel.app/)  
- **Technical WhatsApp:** `+92 322 9781129`  
- **Support Window:** Monday – Friday (Business hours)
