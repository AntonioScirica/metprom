export default {
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    { name: 'links', title: 'Menu items', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'infoDropdownLabel', title: 'Info dropdown label', type: 'localeString' },
    { name: 'infoDropdownLinks', title: 'Info dropdown items', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'ctaLabel', title: 'CTA button text', type: 'localeString' },
    { name: 'ctaHref', title: 'CTA button link', type: 'string' },
  ],
  preview: { prepare: () => ({ title: 'Navbar' }) },
};
