# Brand Logo Drop-in Directory

This directory is monitored by `src/components/Logo.astro` and `scripts/make-icons.mjs`.

## How to replace the temporary logo:
1. Place your official logo file directly into this folder with any of these filenames:
   - `logo.svg` (recommended vector)
   - `logo.png` (high-resolution transparent PNG)
   - `logo.webp`
   - `logo.jpg`
2. Run `npm run make-icons` to regenerate favicons, app icons, and the social Open Graph preview.
3. Build the site (`npm run build`).

The `Logo.astro` component detects the file automatically via `import.meta.glob`. Zero code changes are required.
