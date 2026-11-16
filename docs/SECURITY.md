# Glow & Grace Aesthetics — Security Architecture & Threat Model

This document outlines the security architecture, defensive threat model, platform controls, and vulnerability reporting procedures for the **Glow & Grace Aesthetics** website.

---

## 1. Threat Model & Risk Analysis

As a specialised medical aesthetics practice operating in Dera Ghazi Khan, Pakistan, our primary digital security objectives are:
1. **Preserving Patient Privacy:** Ensuring visitors seeking clinical treatments for personal dermatological concerns (e.g. acne scarring, hair loss, melasma) cannot be profiled, tracked across websites, or deanonymised.
2. **Eliminating Attack Surfaces:** Eliminating attack vectors such as SQL injections, server-side code execution (RCE), authentication bypasses, database compromises, and session hijacking.
3. **Preventing Defacement & Malicious Code Injection:** Protecting site integrity against Cross-Site Scripting (XSS), clickjacking, and supply chain script injections.

### Threat Vector Assessment

| Threat Vector | Conventional Dynamic CMS Risk | Glow & Grace Static Architecture Risk | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **SQL Injection (SQLi)** | High (backend DB queries) | **Zero (Non-Existent)** | Pure static HTML/CSS build; zero database or ORM layer |
| **Server-Side RCE / Deserialization** | High (Node.js/PHP runtime) | **Zero (Non-Existent)** | Static edge CDN delivery without backend application servers |
| **Database Data Leak** | Critical (stored patient records) | **Zero (Non-Existent)** | Zero patient records, health histories, or form inputs stored |
| **Cross-Site Scripting (XSS)** | High (user-submitted comments/posts) | **Extremely Low** | Strict Content-Security-Policy (CSP), no user-generated HTML |
| **Clickjacking / UI Redressing** | Medium (framing site in malicious iframe) | **Zero (Mitigated)** | `frame-ancestors 'none'` and `X-Frame-Options: DENY` |
| **Man-in-the-Middle (MitM)** | Medium (traffic interception) | **Zero (Mitigated)** | HSTS (`max-age=63072000; includeSubDomains; preload`) |
| **Cross-Site Tracking / Ad Pixels** | High (ad network profiling) | **Zero (Mitigated)** | Zero cookies, zero third-party ad pixels, GPC/DNT compliance |

---

## 2. Defensive Security Controls

### A. Static Generation Architecture
- Built with Astro into pre-compiled static HTML, CSS, and vanilla JS.
- No dynamic runtime server, no administrative login panel, no plugin vulnerabilities (unlike WordPress/Drupal).
- Form inputs never post to an internal server; they construct an encrypted WhatsApp URL handled directly by the user's device.

### B. Content Security Policy (CSP)
Our HTTP response headers enforce a strict Content Security Policy defined in `vercel.json`:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-src 'self' https://www.google.com https://maps.google.com; frame-ancestors 'none'; form-action 'self' https://wa.me; base-uri 'self'; object-src 'none';
```

- **`frame-ancestors 'none'`**: Prevents the website from being embedded inside any external iframe.
- **`object-src 'none'`**: Completely blocks legacy Flash/Java plugins.
- **`form-action 'self' https://wa.me`**: Restricts form navigation strictly to the site itself and the official WhatsApp gateway.
- **`frame-src`**: Restricts embedded frames strictly to verified Google Maps embeds when clicked.

### C. Hardened HTTP Response Headers
- **`Strict-Transport-Security`**: `max-age=63072000; includeSubDomains; preload`
- **`X-Content-Type-Options`**: `nosniff` (prevents MIME-confusion attacks)
- **`X-Frame-Options`**: `DENY` (legacy defense in depth for clickjacking)
- **`Referrer-Policy`**: `strict-origin-when-cross-origin` (prevents leaking query paths to third parties)
- **`Permissions-Policy`**: `camera=(), microphone=(), geolocation=(), payment=(), usb=()` (disables unused device hardware APIs)

---

## 3. Subprocessors & Third-Party Infrastructure

We minimize third-party dependencies. Only three external entities are ever involved in site delivery:

| Subprocessor | Role & Architecture | Privacy & Compliance |
| :--- | :--- | :--- |
| **Vercel Inc.** | Static Global Edge Hosting & SSL | SOC 2 Type 2 certified; processes ephemeral server delivery logs (IP, User Agent) strictly for security and DDoS prevention. |
| **Meta Platforms (WhatsApp)** | Patient Appointment Gateway | End-to-end encrypted messaging. Communication initiates only when visitor explicitly chooses to message the clinic. |
| **Google LLC (Google Maps)** | Interactive Location Facade | Zero scripts loaded on page visit. Google Maps iframe initiates only after explicit visitor click on "Load interactive map". |

---

## 4. Vulnerability Disclosure & Contact

If you identify a potential security issue, misconfiguration, or vulnerability on this website:

- **Security Desk:** `security@glowgraceaesthetics.pk` (TODO: Client email verification)
- **Technical Developer:** Contact Sultan Mehmood directly via [Developer Contact Page](/developer/) or WhatsApp at `+923229781129`.
- **Response SLA:** We acknowledge all security reports within 24 hours and patch verified issues within 48 hours.
