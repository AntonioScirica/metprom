export default {
  name: 'workItem',
  title: 'Наша работа',
  type: 'object',
  fields: [
    { name: 'order', title: 'Порядок', type: 'number' },
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'photo', title: 'Фото', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
