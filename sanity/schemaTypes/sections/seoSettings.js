export default {
  name: 'seoSettings',
  title: 'SEO',
  type: 'document',
  fields: [
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: { prepare: () => ({ title: 'SEO' }) },
};
