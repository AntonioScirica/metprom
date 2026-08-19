export default {
  name: 'vakansiiPage',
  title: 'Вакансии',
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
  preview: { prepare: () => ({ title: 'Вакансии' }) },
};
