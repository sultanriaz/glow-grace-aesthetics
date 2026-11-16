export interface BridalPackage {
  id: string;
  name: string;
  timeline: string;
  tagline: string;
  description: string;
  recommendedTreatments: string[];
  startingFrom?: number | null;
}

/**
 * Bridal packages data.
 * Real package tiers and pricing will be set upon client confirmation.
 */
export const bridalPackages: BridalPackage[] = [
  // TODO(client): Add official bridal package tiers (e.g. 1-Month Express, 3-Month Classic, 6-Month Royal) once approved.
];

export const bridalTimelineOptions = [
  { value: '1-month', label: '1 Month Before (Express Glow)' },
  { value: '2-3-months', label: '2 to 3 Months Before (Comprehensive)' },
  { value: '4-6-months', label: '4 to 6 Months Before (Ultimate Transformation)' },
  { value: 'undecided', label: 'Wedding Date Undecided / General Inquiry' }
];

export const bridalTreatmentOptions = [
  'HydraFacial Glow',
  'Gentle Brightening Peels',
  'Carbon Laser Toning',
  'Laser Hair Reduction',
  'PRP Skin Rejuvenation',
  'Under-Eye Dark Circle Care',
  'Full Body Polish & Infusion'
];
