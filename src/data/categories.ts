export interface ServiceCategory {
  slug: 'hair' | 'skin' | 'facial' | 'laser' | 'regenerative' | 'body';
  name: string;
  shortDescription: string;
  icon: string;
  order: number;
}

export const categories: ServiceCategory[] = [
  {
    slug: 'hair',
    name: 'Hair Care & Transplant',
    shortDescription: 'Advanced follicular restoration, PRP, and hair fall prevention protocols.',
    icon: 'sparkles',
    order: 1
  },
  {
    slug: 'skin',
    name: 'Skin Care & Treatments',
    shortDescription: 'Targeted clinical solutions for melasma, acne scars, texture, and pigmentation.',
    icon: 'flower',
    order: 2
  },
  {
    slug: 'facial',
    name: 'Facial Aesthetics & Anti-Aging',
    shortDescription: 'HydraFacial, wrinkle relaxation, contouring, and rejuvenating bridal packages.',
    icon: 'smile',
    order: 3
  },
  {
    slug: 'laser',
    name: 'Laser & Hair Removal',
    shortDescription: 'Precision laser hair reduction, carbon peels, tattoo fading, and electrolysis.',
    icon: 'zap',
    order: 4
  },
  {
    slug: 'regenerative',
    name: 'Regenerative Therapies',
    shortDescription: 'Next-generation PRP and exosome cellular therapies for tissue renewal.',
    icon: 'shield-check',
    order: 5
  },
  {
    slug: 'body',
    name: 'Body & Wellness',
    shortDescription: 'Non-surgical body contouring, fat reduction, and nutritional wellness infusions.',
    icon: 'heart-pulse',
    order: 6
  }
];

export const categoryOrder = ['hair', 'skin', 'facial', 'laser', 'regenerative', 'body'] as const;
