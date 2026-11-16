# Glow & Grace Aesthetics — Custom Domain, DNS & Search Console Runbook

This practical guide is written for clinic management and IT administrators to connect a custom domain (e.g. `glowgrace.pk` or `glowgraceaesthetics.pk`), configure DNS records on Vercel, and verify search engines.

---

## 1. Recommended Domain Name Strategy

For an aesthetic clinic operating in Dera Ghazi Khan and Southern Punjab, we recommend securing both a national `.pk` domain and a fallback `.com`:

| Domain Name | Registrar Type | Recommendation & Rationale |
| :--- | :--- | :--- |
| **`glowgrace.pk`** | PKNIC (.pk) | **Top Choice**: Shortest, highly memorable on WhatsApp, roadside banners, and prescription pads. Strongest local trust in Pakistan. |
| **`glowgraceaesthetics.pk`** | PKNIC (.pk) | **Secondary Choice**: Exact match with clinical branding and signboard. |
| **`glowgraceaesthetics.com`** | Namecheap / Cloudflare | **Global Defense**: Prevents domain squatting and provides international credibility. |

---

## 2. Step-by-Step Domain Registration

### Option A: Registering a `.pk` Domain (PKNIC)
1. Visit **[PKNIC (pknic.net.pk)](https://www.pknic.net.pk/)** or an authorized Pakistani registrar (e.g. HostBreak, WebSouls, HosterPK).
2. Create an account. PKNIC uses prepaid domain cards (available via bank transfer, credit card, or authorized retail scratch cards).
3. Check availability for `glowgrace.pk` or `glowgraceaesthetics.pk` and complete purchase.
4. Keep administrative and technical contact details updated with the clinic's official email address.

### Option B: Registering a `.com` Domain
1. Visit **[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)** or **[Namecheap](https://www.namecheap.com/)**.
2. Search for `glowgraceaesthetics.com`.
3. Complete registration and ensure **WHOIS Privacy Protection** is enabled (standard and free on Cloudflare and Namecheap).

---

## 3. Configuring DNS Records on Vercel

Vercel provides automated SSL certificates (via Let's Encrypt) and global edge routing for custom domains.

### Step 1: Add Domain to Vercel Project
1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Select the `glow-grace-aesthetics` project.
3. Navigate to **Settings** > **Domains**.
4. Enter your domain: `glowgrace.pk` (or `glowgraceaesthetics.pk`).
5. Choose the recommended configuration:
   - Add both **`glowgrace.pk`** and **`www.glowgrace.pk`**.
   - Set one as primary (we recommend `glowgrace.pk` as canonical, with automatic 301 redirect from `www.glowgrace.pk`).

### Step 2: Configure DNS Records at Your Registrar / DNS Manager

Log in to your DNS provider (PKNIC / Cloudflare / Namecheap) and create the following DNS records:

| Record Type | Host / Name | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `76.76.21.21` | 3600 (or Auto) | Points apex domain to Vercel's Anycast edge |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 (or Auto) | Points www subdomain to Vercel edge |

*Note: If using Cloudflare for DNS, set SSL/TLS mode to "Full" or "Strict", and ensure proxy status (orange cloud) is compatible or set to DNS Only (grey cloud) during initial Vercel domain verification.*

---

## 4. Search Engine Verification & Sitemap Submission

### A. Google Search Console (GSC)
1. Open **[Google Search Console](https://search.google.com/search-console)**.
2. Select **Add Property**.
3. Choose **Domain Property** (`glowgrace.pk`) for complete coverage of both http, https, apex, and www.
4. Copy the unique `google-site-verification=...` TXT record provided by Google.
5. Add the TXT record to your DNS settings:
   - **Type**: `TXT`
   - **Host**: `@`
   - **Value**: `google-site-verification=XXXXXXXXXXXXXXXXXXXX`
6. Click **Verify** in Google Search Console.

*(Alternative: If using HTML tag verification, add `PUBLIC_GSC_VERIFICATION="XXXXXXXXXXXXXXXXXXXX"` in Vercel project environment variables and redeploy).*

### B. Bing Webmaster Tools
1. Open **[Bing Webmaster Tools](https://www.bing.com/webmasters)**.
2. Choose **Import from Google Search Console** (simplest 1-click option) OR add property manually.
3. If adding manually, add `PUBLIC_BING_VERIFICATION="YYYYYYYYYYYYYYYYYYYY"` to Vercel environment variables.

### C. Submit XML Sitemap
Once verified in Search Console:
1. Navigate to **Sitemaps** in the left menu.
2. Under "Add a new sitemap", enter: `sitemap-index.xml`.
3. Click **Submit**. Google will crawl all 45+ static treatment and clinic routes.

---

## 5. Post-Switch Verification Checklist

After DNS propagation (typically 1 to 24 hours):

- [ ] **HTTPS & SSL Certificate:** Visit `https://glowgrace.pk` in an incognito window. Ensure the padlock icon appears and the certificate is valid.
- [ ] **Apex / WWW Redirect:** Confirm visiting `http://www.glowgrace.pk` automatically redirects to `https://glowgrace.pk` via HTTP 301.
- [ ] **Update Vercel Environment Variables:**
  - In Vercel Project Settings > Environment Variables:
  - Update `SITE_URL` to `https://glowgrace.pk`.
  - Trigger a redeploy.
- [ ] **Social Card Sharing Preview:**
  - Test on **Facebook Sharing Debugger** (`https://developers.facebook.com/tools/debug/`).
  - Share a link in a WhatsApp chat to confirm the 1200x630 branded OG card unfurls with title, image, and description.
- [ ] **WhatsApp & Phone Link Testing:** Click "Book on WhatsApp" and "Call Clinic" from mobile to confirm dialler and WhatsApp open seamlessly.
