export default {
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    { name: 'order', title: 'Number (01, 02...)', type: 'string' },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'description', title: 'Description', type: 'localeText' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
