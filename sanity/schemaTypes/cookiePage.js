export default {
  name: 'cookiePage',
  title: 'Cookie Policy',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', title: 'Title', type: 'localeString', group: 'content' },
    { name: 'text', title: 'Text', type: 'localeText', group: 'content' },
    { name: 'seo', title: 'SEO', type: 'seo', group: 'seo' },
  ],
  preview: { prepare: () => ({ title: 'Cookie Policy' }) },
};
