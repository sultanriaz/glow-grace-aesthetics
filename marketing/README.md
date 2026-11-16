# Glow & Grace Aesthetics — Marketing & Print QR Assets

This directory contains high-resolution, brand-matched, print-ready QR codes and collateral specifications for **Glow & Grace Aesthetics** (DG Khan).

All assets are generated with high error correction level (`H` / 30% redundancy), allowing them to remain scannable even if partially covered by a logo or when printed on textured materials.

---

## 1. Asset Directory & Specifications

| Asset Name | Format | Dimensions | Target Destination | Color Palette |
| :--- | :--- | :--- | :--- | :--- |
| **`qr-website.svg`** | SVG (Vector) | Scalable | Clinic Website (`https://glow-grace-aesthetics.vercel.app/`) | Emerald `#03422F` on Cream `#FAF8F5` |
| **`qr-website.png`** | PNG (Raster) | 1024 × 1024 px | Clinic Website (`https://glow-grace-aesthetics.vercel.app/`) | Emerald `#03422F` on Cream `#FAF8F5` |
| **`qr-whatsapp.svg`** | SVG (Vector) | Scalable | Direct WhatsApp Booking (`+92 313 4151471` pre-filled) | Emerald `#03422F` on Cream `#FAF8F5` |
| **`qr-whatsapp.png`** | PNG (Raster) | 1024 × 1024 px | Direct WhatsApp Booking (`+92 313 4151471` pre-filled) | Emerald `#03422F` on Cream `#FAF8F5` |
| **`qr-directions.svg`** | SVG (Vector) | Scalable | Google Maps Route (YCDO Ghazi National Hospital) | Emerald `#03422F` on Cream `#FAF8F5` |
| **`qr-directions.png`** | PNG (Raster) | 1024 × 1024 px | Google Maps Route (YCDO Ghazi National Hospital) | Emerald `#03422F` on Cream `#FAF8F5` |

---

## 2. Print Collateral Recommendations

### A. Reception Desk Acrylic Standees (A5 / 148 × 210 mm)
- **Primary QR**: `qr-whatsapp.svg`
- **Secondary QR**: `qr-website.svg`
- **Heading**: "Book Your Next Session or Consultation" / "اگلی اپائنٹمنٹ یا مشاورت بک کریں"
- **Subtext**: "Scan with any smartphone camera to open WhatsApp directly with our front desk team."
- **Placement**: Reception check-in desk, payment counter, and patient consultation suites.

### B. Patient Appointment Cards & Business Cards (85 × 55 mm)
- **Primary QR**: `qr-whatsapp.svg` (minimum print size: 20 × 20 mm for reliable camera focus).
- **Back of Card**: Place QR code alongside clinic address: *YCDO Ghazi National Hospital, Near Samina Chowk, Multan Road, DG Khan*.
- **CTA**: "Scan to message reception or confirm your follow-up appointment."

### C. Post-Procedure Aftercare Handouts & Folders (A4)
- **Primary QR**: `qr-website.svg` (direct to aftercare guidelines and service pages).
- **Secondary QR**: `qr-whatsapp.svg` (emergency post-treatment inquiries).
- **Placement**: Bottom footer of procedure aftercare sheets (Hydrafacial, PRP, Chemical Peels, Laser).

### D. Roadside Banners & Signboards (Multan Road / Samina Chowk)
- **Primary QR**: `qr-directions.svg` or `qr-whatsapp.svg`.
- **File Format**: Use vector `.svg` only for ultra-sharp scaling across 10 ft+ outdoor banners.
- **Minimum Physical Size**: For outdoor billboards viewed from 3–5 meters, the QR code should be at least 250 × 250 mm with high contrast against the background.

### E. Waiting Lounge TV / Digital Screen Slides
- **File Format**: Use `qr-whatsapp.png` or `qr-website.png` placed in the lower-right corner of waiting room presentation slides.
- **CTA**: "Scan to explore our complete aesthetic treatment menu or book a consultation."

---

## 3. How to Regenerate QR Codes

When updating to a custom production domain (e.g. `https://glowgrace.pk`), set the environment variable and run:

```powershell
$env:SITE_URL="https://glowgrace.pk"
npm run make-qr
```

The script will automatically overwrite the SVG and PNG files with the updated URLs.
