export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', title: 'Meta title', type: 'string' },
    { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3 },
    { name: 'ogImage', title: 'Immagine condivisione (OG)', type: 'image' },
  ],
};
