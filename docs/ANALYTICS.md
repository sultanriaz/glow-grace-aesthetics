# Glow & Grace Aesthetics — Analytics Architecture & Privacy Documentation

This document describes the privacy-first conversion tracking system implemented for the **Glow & Grace Aesthetics** website.

---

## 1. Core Philosophy: Private & Off by Default

Patients exploring clinical aesthetic treatments (melasma, acne scars, hair restoration) deserve complete confidentiality. This website is engineered to function with **zero tracking by default**:

- **Off by Default**: In default mode (`PUBLIC_ANALYTICS_PROVIDER="none"`), zero analytics scripts are loaded, zero cookies are set, and zero external tracking calls are made.
- **Single Permitted Provider**: The platform supports **Vercel Web Analytics** only. No Google Analytics, Meta Pixel, TikTok Pixel, Tag Manager, or third-party behavioral trackers are allowed.
- **Zero Cookies**: Neither our code nor Vercel Web Analytics sets cookies on visitor browsers.
- **Strict Privacy Controls**: Do Not Track (DNT) and Global Privacy Control (GPC) browser signals are strictly honoured.

---

## 2. How to Enable Analytics in Production

When clinic management decides to view aggregated traffic statistics:

1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Select the `glow-grace-aesthetics` project.
3. Navigate to **Settings** > **Environment Variables**.
4. Add the following variable:
   - **Key**: `PUBLIC_ANALYTICS_PROVIDER`
   - **Value**: `vercel`
   - **Environments**: Select *Production* and *Preview*.
5. Enable **Web Analytics** in the Vercel project's *Analytics* tab.
6. Trigger a redeploy (or push a new commit) for the environment variable to take effect.

To disable analytics at any time, change `PUBLIC_ANALYTICS_PROVIDER` back to `none` or remove the variable and redeploy.

---

## 3. What Is Tracked vs. What Is Never Tracked

### Event Taxonomy (Minimal & Typed)

| Event Name | Trigger | Payload / Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `whatsapp_click` | Visitor clicks a WhatsApp CTA button | `{ placement: string, service?: string }` | Measures CTA effectiveness by page zone and treatment |
| `call_click` | Visitor clicks a phone dialler link | `{ placement: string }` | Tracks direct phone booking enquiries |
| `directions_click` | Visitor clicks Google Maps directions | `{ placement: string }` | Tracks in-person clinic navigation intent |
| `booking_submit` | Form submitted on `/book-appointment/` | `{ service: string, has_date: boolean, has_note: boolean }` | Tracks online booking intent |
| `bridal_submit` | Custom bridal plan form submitted | `{ timeline: string, treatments_count: number }` | Tracks bridal enquiry volume and package interest |
| `map_loaded` | Visitor clicks "Load interactive map" | `{ placement: 'contact' }` | Tracks engagement with location embed |
| `dev_whatsapp_click` | Visitor contacts website developer | `{ source: 'developer_page' }` | Tracks developer attribution enquiries |
| `dev_portfolio_click` | Visitor opens developer portfolio | `{ source: 'developer_page' }` | Tracks developer portfolio referrals |

### Strictly Excluded (Never Tracked or Sent)

- **NO Patient Names**: Personal names entered into booking forms remain strictly local on the device and are transferred exclusively to WhatsApp.
- **NO Phone Numbers**: Contact numbers are never logged or sent to any analytics backend.
- **NO Free-Text Clinical Queries**: Notes describing medical conditions or personal concerns are never sent to analytics.
- **NO Precise Dates or Times**: Only boolean flags (`has_date: true`) are recorded.
- **NO IP Tracking or Fingerprinting**: Vercel Analytics aggregates requests without storing personal IP addresses.
- **NO Cross-Site Profiling**: Visitors are not tracked across different websites or ad networks.

---

## 4. Why No Cookie Banner Is Required

Under Pakistan's Prevention of Electronic Crimes Act (PECA) 2016, GDPR Recital 30, and ePrivacy Directive guidelines, cookie consent banners are required only when non-essential cookies or local tracking tokens are placed on the user's terminal equipment.

Because this website:
1. Sets **zero cookies** (both first-party and third-party),
2. Uses **no local storage or session storage** to identify visitors,
3. Computes only aggregated, anonymous operational telemetry,

**no cookie banner or consent pop-up is legally required**. This ensures an unhindered, calm, and uncluttered user experience for patients visiting on mobile devices.

---

## 5. Privacy Signal Compliance (DNT & GPC)

Our client-side tracking helper (`src/utils/analytics.ts`) inspects visitor privacy flags before any event is dispatched:

```typescript
const nav = window.navigator as any;
if (nav && (nav.doNotTrack === '1' || nav.globalPrivacyControl === true)) {
  return; // Discard event immediately
}
```

If a visitor has configured their browser with **Do Not Track** (`DNT: 1`) or **Global Privacy Control** (`navigator.globalPrivacyControl === true`), tracking is completely bypassed.
