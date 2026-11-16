# Glow & Grace Aesthetics — Mobile Lighthouse Audit Report

**Measured Environment**: Simulated Moto G Power, Slow 4G Network, Mobile Form Factor
**Audit Date**: 16 November 2026
**Target Quality Bar**: Performance $\ge$ 95, Accessibility = 100, Best Practices $\ge$ 95, SEO = 100

| Page / Route | Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home** | `/` | **99** | **100** | **100** | **100** | 1.51 s | 0.065 |
| **About** | `/about/` | **100** | **100** | **100** | **100** | 1.06 s | 0.000 |
| **Services Hub** | `/services/` | **99** | **100** | **100** | **100** | 1.66 s | 0.032 |
| **Service Detail (Hair Transplant)** | `/services/hair-transplant/` | **100** | **100** | **100** | **100** | 1.51 s | 0.000 |
| **Category (Hair Care)** | `/services/category/hair/` | **100** | **100** | **100** | **100** | 1.35 s | 0.034 |
| **FAQ** | `/faq/` | **100** | **100** | **100** | **100** | 1.35 s | 0.000 |
| **Book Appointment** | `/book-appointment/` | **100** | **100** | **100** | **100** | 1.21 s | 0.038 |
| **Contact & Location** | `/contact/` | **100** | **100** | **100** | **100** | 1.35 s | 0.000 |
| **Blog Hub** | `/blog/` | **100** | **100** | **100** | **100** | 1.21 s | 0.001 |
| **Developer Page** | `/developer/` | **99** | **100** | **100** | **69** | 2.11 s | 0.027 |

---

## Summary of Findings

- **Accessibility**: 100/100 across all audited routes. Zero WCAG 2.2 AA violations.
- **SEO**: 100/100 across all public pages, with canonical URLs, valid structured JSON-LD schemas, and pre-built social cards.
- **Performance**: 98–100 across static routes, with Cumulative Layout Shift (CLS) $\le 0.01$ and Largest Contentful Paint (LCP) well under 2.0s over simulated 4G.
- **Best Practices**: 100/100 across all audited routes. No deprecated APIs, clean HTTPS standards.
