import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const OG_DIR = path.join(ROOT_DIR, 'public', 'og');
const FORCE = process.argv.includes('--force');

if (!fs.existsSync(OG_DIR)) {
  fs.mkdirSync(OG_DIR, { recursive: true });
}

// Load fonts
const cormorantFontData = fs.readFileSync(
  path.join(ROOT_DIR, 'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff')
);
const jostRegularData = fs.readFileSync(
  path.join(ROOT_DIR, 'node_modules/@fontsource/jost/files/jost-latin-400-normal.woff')
);
const jostSemiBoldData = fs.readFileSync(
  path.join(ROOT_DIR, 'node_modules/@fontsource/jost/files/jost-latin-600-normal.woff')
);

const fonts = [
  { name: 'Cormorant Garamond', data: cormorantFontData, weight: 600, style: 'normal' },
  { name: 'Jost', data: jostRegularData, weight: 400, style: 'normal' },
  { name: 'Jost', data: jostSemiBoldData, weight: 600, style: 'normal' }
];

function truncate(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

function buildCardMarkup({ title, category, subtitle }) {
  const displayTitle = truncate(title, 75);
  const displaySubtitle = truncate(subtitle, 125);
  const displayCategory = (category || 'CLINICAL CARE').toUpperCase();

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#0a2319',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #153b2b 0%, #0a2319 75%)',
        padding: '32px',
        boxSizing: 'border-box',
        fontFamily: 'Jost, sans-serif'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              border: '1.5px solid rgba(197, 168, 128, 0.45)',
              borderRadius: '20px',
              padding: '48px 56px',
              boxSizing: 'border-box'
            },
            children: [
              // Top Bar
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: '20px',
                                fontWeight: 600,
                                letterSpacing: '0.16em',
                                color: '#c5a880',
                                textTransform: 'uppercase'
                              },
                              children: 'GLOW & GRACE AESTHETICS'
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid rgba(197, 168, 128, 0.6)',
                          backgroundColor: 'rgba(197, 168, 128, 0.12)',
                          borderRadius: '999px',
                          padding: '6px 20px'
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: '15px',
                                fontWeight: 600,
                                letterSpacing: '0.12em',
                                color: '#e8d8be'
                              },
                              children: displayCategory
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },

              // Middle Main Content
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '18px',
                    margin: 'auto 0'
                  },
                  children: [
                    {
                      type: 'h1',
                      props: {
                        style: {
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '60px',
                          fontWeight: 600,
                          lineHeight: 1.15,
                          color: '#faf8f5',
                          margin: 0
                        },
                        children: displayTitle
                      }
                    },
                    {
                      type: 'p',
                      props: {
                        style: {
                          fontSize: '24px',
                          lineHeight: 1.4,
                          color: '#c5a880',
                          margin: 0,
                          maxWidth: '960px'
                        },
                        children: displaySubtitle
                      }
                    }
                  ]
                }
              },

              // Bottom Bar
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(197, 168, 128, 0.25)'
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '18px',
                          color: '#bfa787',
                          letterSpacing: '0.02em'
                        },
                        children: 'YCDO Ghazi National Hospital, Multan Road, DG Khan'
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#071811',
                          border: '1px solid rgba(197, 168, 128, 0.4)',
                          borderRadius: '8px',
                          padding: '8px 18px',
                          color: '#faf8f5',
                          fontSize: '17px',
                          fontWeight: 600
                        },
                        children: 'WhatsApp: 0313-4151471'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  };
}

async function generateOgImage(item) {
  const destPath = path.join(OG_DIR, item.filename);

  if (!FORCE && fs.existsSync(destPath)) {
    if (item.sourcePath && fs.existsSync(item.sourcePath)) {
      const sourceMtime = fs.statSync(item.sourcePath).mtimeMs;
      const destMtime = fs.statSync(destPath).mtimeMs;
      if (destMtime >= sourceMtime) {
        return { filename: item.filename, skipped: true };
      }
    } else {
      return { filename: item.filename, skipped: true };
    }
  }

  const vnode = buildCardMarkup({
    title: item.title,
    category: item.category,
    subtitle: item.subtitle
  });

  const svg = await satori(vnode, {
    width: 1200,
    height: 630,
    fonts
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 }
  });

  const pngData = resvg.render().asPng();
  const jpegBuffer = await sharp(pngData).jpeg({ quality: 85 }).toBuffer();

  fs.writeFileSync(destPath, jpegBuffer);

  const sizeKb = Math.round(jpegBuffer.length / 1024);
  if (sizeKb > 200) {
    console.warn(`[WARN] OG image ${item.filename} exceeds 200 KB (${sizeKb} KB)`);
  }

  return { filename: item.filename, sizeKb, skipped: false };
}

function parseMarkdownFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};

  yaml.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !line.trim().startsWith('-')) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      result[key] = val;
    }
  });

  // Calculate read time
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const wordCount = body.trim().split(/\s+/).length;
  result._wordCount = wordCount;
  result._readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return result;
}

async function main() {
  console.log('Generating social share OG images (1200x630 JPEG)...');
  const items = [];

  // 1. Core Pages
  items.push(
    {
      filename: 'og-home.jpg',
      title: 'Hair, Body, Skin Care & Aesthetics',
      category: 'DG KHAN',
      subtitle: 'Safe, certified, and doctor-led clinical aesthetics at YCDO Ghazi National Hospital',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'index.astro')
    },
    {
      filename: 'og-default.jpg',
      title: 'Glow & Grace Aesthetics',
      category: 'DERA GHAZI KHAN',
      subtitle: 'Doctor-led aesthetic medicine and dermatological treatments in South Punjab',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'index.astro')
    },
    {
      filename: 'og-about.jpg',
      title: 'About Glow & Grace Aesthetics',
      category: 'OUR CLINIC',
      subtitle: 'Doctor-led clinical care, patient safety, and medical aesthetics in Dera Ghazi Khan',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'about.astro')
    },
    {
      filename: 'og-services.jpg',
      title: 'Aesthetic Treatments & Services',
      category: 'SERVICES',
      subtitle: 'Comprehensive medical treatments for hair, skin, face, and body rejuvenation',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'services', 'index.astro')
    },
    {
      filename: 'og-faq.jpg',
      title: 'Frequently Asked Questions',
      category: 'PATIENT GUIDE',
      subtitle: 'Doctor-reviewed answers about aesthetic treatments, consultations, and care',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'faq.astro')
    },
    {
      filename: 'og-book-appointment.jpg',
      title: 'Request an Appointment',
      category: 'APPOINTMENTS',
      subtitle: 'Book your consultation with our aesthetic physician via WhatsApp',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'book-appointment.astro')
    },
    {
      filename: 'og-contact.jpg',
      title: 'Contact & Clinic Location',
      category: 'VISIT US',
      subtitle: 'YCDO Ghazi National Hospital, Near Samina Chowk, Multan Road, DG Khan',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'contact.astro')
    },
    {
      filename: 'og-blog.jpg',
      title: 'Skin & Hair Educational Guides',
      category: 'BLOG',
      subtitle: 'Evidence-grounded aesthetic medicine and patient education from DG Khan',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'blog', 'index.astro')
    },
    {
      filename: 'og-privacy.jpg',
      title: 'Privacy Policy',
      category: 'LEGAL NOTICE',
      subtitle: 'Zero-cookie, patient-first privacy standards at Glow & Grace Aesthetics',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'privacy.astro')
    },
    {
      filename: 'og-terms.jpg',
      title: 'Terms of Use',
      category: 'LEGAL NOTICE',
      subtitle: 'Terms governing website usage and clinical appointment requests',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'terms.astro')
    },
    {
      filename: 'og-medical-disclaimer.jpg',
      title: 'Medical Disclaimer',
      category: 'LEGAL NOTICE',
      subtitle: 'Important clinical guidance regarding aesthetic procedures and doctor consultations',
      sourcePath: path.join(ROOT_DIR, 'src', 'pages', 'medical-disclaimer.astro')
    }
  );

  // 2. Category Landing Pages (6)
  const categoriesList = [
    { slug: 'hair', name: 'Hair Treatments & Restoration', cat: 'HAIR CARE', desc: 'Clinical solutions for hair fall, PRP restoration, and hair transplants' },
    { slug: 'skin', name: 'Advanced Skin Care & Dermatology', cat: 'SKIN CARE', desc: 'Doctor-led care for melasma, acne scars, chemical peels, and glowing skin' },
    { slug: 'facial', name: 'Facial Aesthetics & Rejuvenation', cat: 'FACIAL CARE', desc: 'Hydrafacial, contouring, anti-aging therapies, and bridal glow journeys' },
    { slug: 'laser', name: 'Laser Treatments & Permanent Reduction', cat: 'LASER CARE', desc: 'Precision laser hair removal, Carbon Pico laser, and tattoo removal' },
    { slug: 'regenerative', name: 'Regenerative Aesthetics & Biostimulation', cat: 'REGENERATIVE', desc: 'PRP therapy and exosome biostimulation for natural tissue renewal' },
    { slug: 'body', name: 'Body Aesthetics & Contouring', cat: 'BODY CARE', desc: 'Non-surgical weight and fat reduction and wellness treatments' }
  ];

  for (const cat of categoriesList) {
    items.push({
      filename: `og-category-${cat.slug}.jpg`,
      title: cat.name,
      category: cat.cat,
      subtitle: cat.desc,
      sourcePath: path.join(ROOT_DIR, 'src', 'data', 'categories.ts')
    });
  }

  // 3. Service Detail Pages (23)
  const servicesDir = path.join(ROOT_DIR, 'src', 'content', 'services');
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.md'));
    for (const sf of serviceFiles) {
      const slug = sf.replace(/\.md$/, '');
      const filePath = path.join(servicesDir, sf);
      const fm = parseMarkdownFrontmatter(filePath);
      items.push({
        filename: `og-service-${slug}.jpg`,
        title: fm.title || slug,
        category: (fm.category ? `${fm.category} care` : 'CLINICAL SERVICE').toUpperCase(),
        subtitle: fm.summary || fm.tagline || fm.seoDescription || 'Advanced aesthetic treatment at Glow & Grace Aesthetics',
        sourcePath: filePath
      });
    }
  }

  // 4. Blog Posts (6)
  const blogDir = path.join(ROOT_DIR, 'src', 'content', 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
    for (const bf of blogFiles) {
      const slug = bf.replace(/\.md$/, '');
      const filePath = path.join(blogDir, bf);
      const fm = parseMarkdownFrontmatter(filePath);
      items.push({
        filename: `og-blog-${slug}.jpg`,
        title: fm.title || slug,
        category: `BLOG • ${fm._readTime}`,
        subtitle: fm.description || 'Doctor-reviewed patient guide from Glow & Grace Aesthetics',
        sourcePath: filePath
      });
    }
  }

  let generatedCount = 0;
  let skippedCount = 0;

  for (const item of items) {
    try {
      const result = await generateOgImage(item);
      if (result.skipped) {
        skippedCount++;
      } else {
        generatedCount++;
        console.log(`  ✓ Generated ${result.filename} (${result.sizeKb} KB)`);
      }
    } catch (err) {
      console.error(`  ✗ Failed to generate ${item.filename}:`, err);
    }
  }

  console.log(`\nSocial card generation complete: ${generatedCount} generated, ${skippedCount} skipped (cached). Total: ${items.length}`);
}

main().catch((err) => {
  console.error('Fatal error in make-og.mjs:', err);
  process.exit(1);
});
