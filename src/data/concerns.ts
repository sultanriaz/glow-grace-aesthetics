export interface ConcernItem {
  label: string;
  serviceSlug: string;
  icon: string;
}

export const concerns: ConcernItem[] = [
  { label: 'Pigmentation', serviceSlug: 'melasma-treatment', icon: 'sun' },
  { label: 'Acne scars', serviceSlug: 'acne-scar-treatment', icon: 'shield-alert' },
  { label: 'Hair fall', serviceSlug: 'hair-fall-treatment', icon: 'sparkles' },
  { label: 'Unwanted hair', serviceSlug: 'laser-hair-removal', icon: 'zap' },
  { label: 'Fine lines', serviceSlug: 'anti-aging-treatments', icon: 'clock' },
  { label: 'Dull skin', serviceSlug: 'hydrafacial', icon: 'droplet' },
  { label: 'Dark circles', serviceSlug: 'dark-circles-under-eye', icon: 'eye' },
  { label: 'Unwanted tattoo', serviceSlug: 'tattoo-removal', icon: 'x-circle' },
  { label: 'Bridal prep', serviceSlug: 'bridal-glow-packages', icon: 'heart' },
  { label: 'Weight & fat', serviceSlug: 'weight-fat-reduction', icon: 'activity' }
];
