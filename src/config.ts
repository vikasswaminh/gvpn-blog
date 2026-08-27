// ─────────────────────────────────────────────────────────────────────────────
//  PER-PROJECT BRANDING  ·  the ONLY file that changes between blog repos.
//  Owner-locked via CODEOWNERS — the SEO team does not edit this (see CONTRIBUTING.md).
// ─────────────────────────────────────────────────────────────────────────────
export const SITE = {
  brand: 'MeshWG',
  title: 'MeshWG Blog',
  description: 'Guides, tips, and product updates from the MeshWG team.',
  url: 'https://blogs.meshwg.com',
  marketingUrl: 'https://meshwg.com',
  marketingLabel: 'meshwg.com',
  author: 'MeshWG Team',
  accent: '#14b8a6',
  tagline: 'Mesh networking, simplified.',
  locale: 'en',
} as const;

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Tags', href: '/tags/' },
  { label: 'About', href: '/about/' },
];
