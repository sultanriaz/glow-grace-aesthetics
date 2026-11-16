import { categories } from './categories';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  {
    label: 'Services',
    href: '/services/',
    hasDropdown: true,
    children: categories.map((cat) => ({
      label: cat.name,
      href: `/services/#${cat.slug}`,
      description: cat.shortDescription
    }))
  },
  { label: 'Contact', href: '/contact/' }
];

export const footerQuickLinks: Array<{ label: string; href: string }> = [
  { label: 'Home', href: '/' },
  { label: 'About the Clinic', href: '/about/' },
  { label: 'All Services', href: '/services/' },
  { label: 'Contact & Map', href: '/contact/' }
];
