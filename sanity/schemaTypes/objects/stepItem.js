export default {
  name: 'stepItem',
  title: 'Шаг',
  type: 'object',
  fields: [
    { name: 'order', title: 'Номер (01, 02...)', type: 'string' },
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'text', title: 'Текст', type: 'localeText' },
  ],
  preview: { select: { title: 'title.ru', subtitle: 'order' } },
};
