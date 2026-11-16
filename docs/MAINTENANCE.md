# Glow & Grace Aesthetics — Technical Maintenance & Engineering Runbook

This manual covers ongoing technical maintenance, dependency management, disaster recovery, and engineering workflows for the **Glow & Grace Aesthetics** web platform.

---

## 1. Architecture & Maintenance Philosophy

The website is constructed using a modern **Jamstack architecture** powered by **Astro v5 Static Site Generation (SSG)**. This design provides three profound operational advantages:
1. **Zero Database Overhead:** No MySQL, PostgreSQL, or WordPress databases to patch, optimize, or secure against SQL injection.
2. **Zero Server Maintenance:** No Linux VM or container OS to patch; pre-compiled static assets are served directly from Vercel's global edge network.
3. **Immutable Git Deployments:** Every deployment is a cryptographically hashed git commit. Any rollback to a previous version takes less than 5 seconds via the Vercel dashboard.

---

## 2. Maintenance Schedules & Routine Tasks

| Frequency | Routine Task | Procedure | Responsible Party |
| :--- | :--- | :--- | :--- |
| **Monthly** | **Security Vulnerability Audit** | Run `npm audit` in the root workspace. Apply minor security patches if reported. | Webmaster / Engineer |
| **Monthly** | **Search Console Health Check** | Review Google Search Console for coverage issues, 404s, or mobile usability warnings. | Webmaster |
| **Quarterly** | **Dependency Modernization** | Test and upgrade Astro minor versions, Satori, and Sharp (`npm outdated`). | Engineer |
| **Quarterly** | **Lighthouse & Budget Audit** | Run `npm run check:budgets` and mobile Lighthouse to ensure performance scores remain $\ge 95$. | Engineer |
| **Annually** | **Domain & DNS Renewal** | Ensure PKNIC domain fee for `glowgrace.pk` is renewed at least 30 days before expiration. | Clinic Management |

---

## 3. Dependency Upgrade Protocol

Follow this safe step-by-step workflow when updating dependencies:

### Step 1: Create a Dedicated Update Branch
Never commit untested dependency upgrades directly to the production branch.
```powershell
git checkout main
git pull origin main
git checkout -b chore/dependency-updates
```

### Step 2: Check Outdated Packages
```powershell
npm outdated
```

### Step 3: Upgrade Minor Versions
```powershell
npm update
```

### Step 4: Execute Complete Local Quality Suite
Before pushing, verify that all compile-time checks, unit tests, and performance limits pass:
```powershell
npm run check
npm test
npm run check:claims
npm run build
npm run check:links
npm run check:seo
npm run check:schema
npm run check:privacy
npm run check:headers
npm run check:budgets
```

### Step 5: Test Preview Deployment on Vercel
Push the branch:
```powershell
git push origin chore/dependency-updates
```
Vercel will generate an isolated preview URL (e.g. `glow-grace-aesthetics-git-chore-dependency-updates.vercel.app`). Verify that the preview loads cleanly, images render, and forms open WhatsApp without issues.

### Step 6: Merge to Main
Once verified, merge the branch into `main` to trigger the production deployment.

---

## 4. Disaster Recovery & Backup Strategy

Because the website is 100% static and file-driven:
- **The Git Repository IS the Full Backup:** Every line of code, clinical markdown document, custom icon, and image asset resides within the GitHub repository.
- **Instant Cloud Redundancy:** If Vercel services were ever disrupted, the exact same repository can be connected to Cloudflare Pages, Netlify, or AWS S3/CloudFront in under 10 minutes without changing a single line of application code.

### Restoring from Scratch
To redeploy from a blank machine:
```powershell
git clone https://github.com/sultanriaz/glow-grace-aesthetics.git
cd glow-grace-aesthetics
npm ci
npm run build
```
The output directory `dist/` is immediately ready to be hosted on any static HTTP server.

---

## 5. Troubleshooting Common Issues

### Issue 1: Node.js Version Mismatch
- **Symptom:** Build fails with syntax errors or module loading issues.
- **Requirement:** Node.js LTS $\ge 20.0.0$ is required. Verify with `node -v`.

### Issue 2: Sharp Binary Architecture Mismatch
- **Symptom:** `Error: 'sharp' module was compiled against a different Node.js version`.
- **Resolution:** Delete `node_modules` and run a clean reinstall:
  ```powershell
  Remove-Item -Recurse -Force node_modules, package-lock.json
  npm install
  ```

### Issue 3: Medical Claims Check Failure
- **Symptom:** `npm run check:claims` fails with `[BANNED WORD] "guarantee"`.
- **Resolution:** Inspect the flagged file. Medical regulations prohibit guarantees. Rephrase to compliant phrasing (e.g., "designed to support skin clarity" rather than "guaranteed clear skin"). If the phrase is in a disclaimer explicitly negating a guarantee (e.g., "no guarantee can be provided"), add the context to `scripts/claims-allowlist.json`.
