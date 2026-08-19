export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', title: 'Meta-заголовок', type: 'string' },
    { name: 'metaDescription', title: 'Meta-описание', type: 'text', rows: 3 },
    { name: 'ogImage', title: 'Изображение для шеринга (OG)', type: 'image' },
  ],
};
