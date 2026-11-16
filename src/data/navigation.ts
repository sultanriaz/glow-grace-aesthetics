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
      href: `/services/category/${cat.slug}/`,
      description: cat.shortDescription
    }))
  },
  { label: 'Bridal', href: '/services/bridal-glow-packages/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' }
];

export const footerQuickLinks: Array<{ label: string; href: string }> = [
  { label: 'Home', href: '/' },
  { label: 'About the Clinic', href: '/about/' },
  { label: 'All Services', href: '/services/' },
  { label: 'Bridal Glow Packages', href: '/services/bridal-glow-packages/' },
  { label: 'Frequently Asked Questions', href: '/faq/' },
  { label: 'Educational Blog', href: '/blog/' },
  { label: 'Book Appointment', href: '/book-appointment/' },
  { label: 'Contact & Map', href: '/contact/' }
];
