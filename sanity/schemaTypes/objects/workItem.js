export default {
  name: 'workItem',
  title: 'Our work',
  type: 'object',
  fields: [
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
