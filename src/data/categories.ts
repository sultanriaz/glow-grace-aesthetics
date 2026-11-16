export interface CategoryJourneyStep {
  step: number;
  title: string;
  description: string;
  serviceSlug?: string;
}

export interface ServiceCategory {
  slug: 'hair' | 'skin' | 'facial' | 'laser' | 'regenerative' | 'body';
  name: string;
  shortDescription: string;
  icon: string;
  order: number;
  longIntro: [string, string];
  concerns: string[];
  faqs: Array<{ question: string; answer: string }>;
  seoTitle: string;
  seoDescription: string;
  journey?: CategoryJourneyStep[];
}

export const categories: ServiceCategory[] = [
  {
    slug: 'hair',
    name: 'Hair Care & Transplant',
    shortDescription: 'Advanced follicular restoration, PRP, and hair fall prevention protocols.',
    icon: 'sparkles',
    order: 1,
    longIntro: [
      'Hair thinning, shedding, and receding hairlines can deeply affect your personal confidence and daily peace of mind. At Glow & Grace Aesthetics in Dera Ghazi Khan, we provide medical assessment to understand why hair loss is happening before recommending any course of action.',
      'From non-surgical follicle stimulation such as PRP therapy to advanced follicular unit extraction (FUE) transplantation, every plan is tailored to your unique hair density, scalp condition, and long-term aesthetic goals.'
    ],
    concerns: [
      'Hair Thinning & Shedding',
      'Male & Female Pattern Baldness',
      'Receding Hairlines & Crown Loss',
      'Weak Scalp Circulation',
      'Post-Transplant Maintenance'
    ],
    faqs: [
      {
        question: 'How do I know whether I need medical therapy or a hair transplant?',
        answer: 'During your initial consultation in DG Khan, our medical team examines your scalp density, follicular health, and shedding pattern. Early thinning often responds well to regenerative PRP or topical protocols, whereas established donor-stable areas of loss may benefit from follicular unit extraction.'
      },
      {
        question: 'How many sessions are typically required for hair fall treatment?',
        answer: 'Most non-surgical stimulation plans involve an initial series of 3 to 6 sessions spaced 3 to 4 weeks apart, followed by seasonal maintenance visits tailored to how your scalp responds.'
      },
      {
        question: 'Is there significant recovery time after hair procedures?',
        answer: 'Non-surgical treatments like PRP require minimal downtime, allowing you to resume regular desk activities the following day. For surgical hair transplantation, gentle scalp recovery takes approximately 7 to 10 days.'
      },
      {
        question: 'When can visible changes in hair density be noticed?',
        answer: 'Hair grows slowly in natural biological cycles. Noticeable improvements in shedding control typically emerge after 8 to 12 weeks, with visible fullness and mature growth developing over 6 to 12 months.'
      }
    ],
    seoTitle: 'Hair Care & Hair Transplant in DG Khan | Glow & Grace',
    seoDescription: 'Doctor-guided hair loss treatments and follicular restoration at Glow & Grace Aesthetics in Dera Ghazi Khan. Personalised care for hair vitality.',
    journey: [
      {
        step: 1,
        title: 'Initial Medical Scalp Assessment',
        description: 'Detailed scalp trichoscopy, shedding history, and donor density evaluation at our clinic in DG Khan.',
        serviceSlug: 'hair-fall-treatment'
      },
      {
        step: 2,
        title: 'Root Cause Identification',
        description: 'Evaluating hormonal, nutritional, and genetic factors influencing follicular miniaturisation.'
      },
      {
        step: 3,
        title: 'Personalised Protocol Design',
        description: 'Selecting between regenerative PRP stimulation, medical scalp therapies, or surgical restoration.',
        serviceSlug: 'prp-hair-restoration'
      },
      {
        step: 4,
        title: 'Clinical Treatment Execution',
        description: 'Carefully performed clinical sessions adhering to rigorous sterile medical standards.',
        serviceSlug: 'hair-transplant'
      },
      {
        step: 5,
        title: 'Progress Review & Long-Term Maintenance',
        description: 'Scheduled follow-ups and home-care guidance to sustain long-term scalp and follicle vitality.'
      }
    ]
  },
  {
    slug: 'skin',
    name: 'Skin Care & Treatments',
    shortDescription: 'Targeted clinical solutions for melasma, acne scars, texture, and pigmentation.',
    icon: 'flower',
    order: 2,
    longIntro: [
      'Healthy, vibrant skin is built on consistent, doctor-led clinical care rather than trial-and-error cosmetic trends. At our clinic in Dera Ghazi Khan, we treat persistent conditions such as melasma, stubborn acne scarring, uneven pigmentation, and sun-induced damage with gentle, evidence-based methods.',
      'Our treatments combine therapeutic chemical peels, microneedling, mesotherapy, and targeted skin resurfacing to restore clear tone and smooth texture, always prioritising skin barrier integrity and long-term safety.'
    ],
    concerns: [
      'Melasma & Hormonal Pigmentation',
      'Acne Scars & Blemishes',
      'Uneven Skin Tone & Sun Damage',
      'Dark Under-Eye Circles',
      'Moles, Warts & Skin Tags',
      'Stretch Marks'
    ],
    faqs: [
      {
        question: 'How does clinical skin therapy differ from salon facials?',
        answer: 'Clinical skin treatments are administered under medical supervision using pharmaceutical-grade active ingredients, calibrated acids, and sterile microneedling devices designed to support cellular renewal beneath the surface layer.'
      },
      {
        question: 'How do you manage melasma without aggravating pigmentation?',
        answer: 'Melasma in Pakistani skin tones requires cautious, gentle approaches. We avoid harsh heat that can trigger rebound darkening, focusing instead on delicate pigment-inhibiting peels, mesotherapy, and strict daily broad-spectrum sun protection.'
      },
      {
        question: 'Will my skin peel visibly after treatment?',
        answer: 'Depending on whether you receive a light enzyme peel or a deeper resurfacing peel, flaking can range from invisible micro-exfoliation to light peeling for 3 to 5 days. We provide comprehensive soothing aftercare.'
      },
      {
        question: 'How many sessions are recommended for acne scar reduction?',
        answer: 'Textured acne scars typically require a series of 3 to 5 microneedling or resurfacing sessions spaced 4 to 6 weeks apart, allowing new collagen networks time to mature.'
      }
    ],
    seoTitle: 'Clinical Skin Treatments in DG Khan | Glow & Grace Aesthetics',
    seoDescription: 'Doctor-led solutions for melasma, acne scars, pigmentation, and skin rejuvenation at Glow & Grace Aesthetics in Dera Ghazi Khan. Book your consultation.'
  },
  {
    slug: 'facial',
    name: 'Facial Aesthetics & Anti-Aging',
    shortDescription: 'HydraFacial, wrinkle relaxation, contouring, and rejuvenating bridal packages.',
    icon: 'smile',
    order: 3,
    longIntro: [
      'Facial aesthetics at Glow & Grace Aesthetics centres on refined, natural enhancement that honours your unique facial architecture. We believe the most beautiful aesthetic results are subtle, leaving you looking rested, refreshed, and confident.',
      'Whether you are seeking deep vortex hydration with HydraFacial, softening expression lines, restoring gentle volume to lips and cheeks, or preparing a comprehensive bridal glow, our doctor-guided treatments emphasise balance, comfort, and safety.'
    ],
    concerns: [
      'Dull & Dehydrated Complexion',
      'Fine Lines & Forehead Creases',
      'Loss of Facial Volume & Definition',
      'Lip Thinning & Asymmetry',
      'Pre-Wedding Complexion Preparation'
    ],
    faqs: [
      {
        question: 'Will facial contouring or wrinkle relaxation make my expressions look unnatural?',
        answer: 'Our clinical philosophy prioritises natural movement. Wrinkle-relaxing injections and hyaluronic acid fillers are placed with micro-precision to soften fatigue lines while maintaining your natural expressions.'
      },
      {
        question: 'How long does a HydraFacial treatment take?',
        answer: 'A complete multi-step HydraFacial takes approximately 45 to 60 minutes, providing deep cleansing, extraction, and antioxidant hydration without social downtime.'
      },
      {
        question: 'How long do hyaluronic acid fillers last?',
        answer: 'Depending on the treatment area, formulation density, and individual metabolic rate, dermal filler results typically remain visible for 6 to 18 months before naturally dissolving.'
      },
      {
        question: 'How far in advance of an event should I schedule facial procedures?',
        answer: 'For non-invasive hydration facials, 3 to 5 days before your occasion is ideal. For injectable treatments, we recommend scheduling at least 3 to 4 weeks in advance to allow full settling.'
      }
    ],
    seoTitle: 'Facial Aesthetics & Anti-Aging in DG Khan | Glow & Grace',
    seoDescription: 'Refined HydraFacial, natural facial contouring, and anti-aging treatments at Glow & Grace Aesthetics in Dera Ghazi Khan. Consult with our aesthetic team.'
  },
  {
    slug: 'laser',
    name: 'Laser & Hair Removal',
    shortDescription: 'Precision laser hair reduction, carbon peels, tattoo fading, and electrolysis.',
    icon: 'zap',
    order: 4,
    longIntro: [
      'Laser technology offers precise, non-invasive solutions for unwanted hair, difficult pigmentation, and cosmetic tattoo fading. At our DG Khan practice, we use calibrated laser systems suitable for South Asian skin phototypes.',
      'From gradual follicle reduction and precision electrolysis for fine or unpigmented strands to photoacoustic carbon laser toning, our clinical team designs sessions that protect your skin surface while delivering consistent results.'
    ],
    concerns: [
      'Unwanted Facial & Body Hair',
      'Fine, Blonde or Hormonal Hairs',
      'Enlarged Pores & Oily Complexion',
      'Unwanted Cosmetic or Decorative Tattoos',
      'Superficial Pigmentation'
    ],
    faqs: [
      {
        question: 'Is laser hair reduction effective for South Asian skin tones?',
        answer: 'Yes. We utilise targeted wavelengths designed to safely bypass epidermal melanin and concentrate energy on the follicle, reducing the risk of hyperpigmentation.'
      },
      {
        question: 'How many laser hair reduction sessions are typically required?',
        answer: 'Because hair follicles cycle through growth, resting, and shedding phases, most patients require 6 to 8 sessions spaced 4 to 6 weeks apart for significant, long-term hair reduction.'
      },
      {
        question: 'What is the difference between laser hair reduction and electrolysis?',
        answer: 'Laser treats clusters of pigmented hairs quickly across areas like the face, underarms, or arms. Electrolysis treats individual hairs one by one and is especially useful for fine, grey, or blonde hairs that do not respond to laser light.'
      },
      {
        question: 'How many sessions are needed to fade a tattoo?',
        answer: 'Tattoo fading depends on ink depth, colours used, age of the tattoo, and your body\'s lymphatic clearance. Most tattoos require 5 to 10 sessions spaced 6 to 8 weeks apart.'
      }
    ],
    seoTitle: 'Laser Treatments & Hair Removal DG Khan | Glow & Grace',
    seoDescription: 'Advanced laser hair reduction, electrolysis, and carbon pico laser treatments in Dera Ghazi Khan. Safe protocols calibrated for South Asian skin.'
  },
  {
    slug: 'regenerative',
    name: 'Regenerative Therapies',
    shortDescription: 'Next-generation PRP and exosome cellular therapies for tissue renewal.',
    icon: 'shield-check',
    order: 5,
    longIntro: [
      'Regenerative aesthetics represents a forward-thinking shift toward harnessing your body\'s biological cellular mechanisms. Rather than simply masking symptoms of tissue fatigue, these therapies stimulate natural healing cascades.',
      'By concentrating autologous platelet growth factors and cellular signaling exosome messengers, our therapies support microcirculation, collagen synthesis, and follicular rejuvenation with high biocompatibility.'
    ],
    concerns: [
      'Scalp Hair Miniaturisation',
      'Dull, Thinning or Crepey Skin',
      'Slow Tissue Healing',
      'Collagen Depletion',
      'Under-Eye Hollows & Discolouration'
    ],
    faqs: [
      {
        question: 'What is the primary difference between PRP and Exosome therapy?',
        answer: 'PRP utilises your own blood platelets to release natural growth factors. Exosome therapy utilises concentrated cellular vesicles rich in signaling peptides and proteins, offering an advanced biological approach to cellular renewal.'
      },
      {
        question: 'Is PRP safe?',
        answer: 'Because PRP uses your own autologous blood drawn on the day of treatment, there is no risk of foreign-body rejection or allergic reaction. All processing follows sterile, single-use medical standards.'
      },
      {
        question: 'Can regenerative treatments be combined with other procedures?',
        answer: 'Yes. PRP and exosomes are frequently paired with microneedling or post-transplant care to enhance cellular absorption and support tissue recovery.'
      },
      {
        question: 'How long before regenerative treatment outcomes become noticeable?',
        answer: 'Cellular renewal occurs gradually over several weeks. Most patients observe noticeable texture refinement and hair quality improvements 6 to 12 weeks into their treatment course.'
      }
    ],
    seoTitle: 'Regenerative PRP & Exosome Therapy in DG Khan | Glow & Grace',
    seoDescription: 'Discover biological PRP and exosome therapies for scalp and skin rejuvenation at Glow & Grace Aesthetics in Dera Ghazi Khan. Doctor-led consultations.'
  },
  {
    slug: 'body',
    name: 'Body & Wellness',
    shortDescription: 'Non-surgical body contouring, fat reduction, and nutritional wellness infusions.',
    icon: 'heart-pulse',
    order: 6,
    longIntro: [
      'Achieving your body confidence goals requires holistic, medically supported care. At Glow & Grace Aesthetics in Dera Ghazi Khan, our body and wellness treatments focus on non-invasive contouring and supportive nutritional therapies.',
      'Whether you are seeking targeted refinement for localized stubborn deposits or antioxidant nutrient infusions to support daily vitality, we help you select sensible, safe steps that complement a balanced lifestyle.'
    ],
    concerns: [
      'Localized Stubborn Fat Pockets',
      'Skin Laxity on Body Areas',
      'Cellular Fatigue & Dull Complexion',
      'Nutritional Micronutrient Depletion'
    ],
    faqs: [
      {
        question: 'Are non-surgical fat reduction treatments a replacement for weight loss?',
        answer: 'No. Non-surgical contouring treatments are designed for targeted spot reduction of stubborn fat pockets that resist diet and exercise, rather than overall weight reduction.'
      },
      {
        question: 'Who is an ideal candidate for body contouring?',
        answer: 'Individuals near their target body weight with firm, localized pockets of fullness—such as the submental chin area or lower abdomen—benefit most from localized contouring.'
      },
      {
        question: 'What ingredients are used in nutritional wellness infusions?',
        answer: 'Our wellness infusions contain medical-grade antioxidants, vitamin C, B-complex vitamins, and hydrating electrolytes administered under clinical supervision.'
      },
      {
        question: 'What aftercare should I follow after body contouring treatments?',
        answer: 'We recommend drinking plenty of water, engaging in light physical movement like walking, and maintaining a balanced diet to assist your lymphatic system in processing treated deposits.'
      }
    ],
    seoTitle: 'Body Contouring & Wellness in DG Khan | Glow & Grace',
    seoDescription: 'Non-surgical body refinement and nutritional wellness infusions in Dera Ghazi Khan at Glow & Grace Aesthetics. Medical consultations and safe protocols.'
  }
];

export const categoryOrder = ['hair', 'skin', 'facial', 'laser', 'regenerative', 'body'] as const;
