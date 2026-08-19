export default {
  name: 'serviceItem',
  title: 'Услуга',
  type: 'object',
  fields: [
    { name: 'order', title: 'Номер (01, 02...)', type: 'string' },
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'description', title: 'Описание', type: 'localeText' },
    { name: 'photo', title: 'Фото', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
