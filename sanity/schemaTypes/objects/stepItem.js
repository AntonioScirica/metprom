export default {
  name: 'stepItem',
  title: 'Step',
  type: 'object',
  fields: [
    { name: 'order', title: 'Number (01, 02...)', type: 'string' },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'text', title: 'Text', type: 'localeText' },
  ],
  preview: { select: { title: 'title.ru', subtitle: 'order' } },
};
