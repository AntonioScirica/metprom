export default {
  name: 'pokupatelyamPage',
  title: 'Покупателям',
  type: 'document',
  groups: [
    { name: 'content', title: 'Контент' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', title: 'Заголовок', type: 'localeString', group: 'content' },
    { name: 'text', title: 'Текст', type: 'localeText', group: 'content' },
    { name: 'seo', title: 'SEO', type: 'seo', group: 'seo' },
  ],
  preview: { prepare: () => ({ title: 'Покупателям' }) },
};
