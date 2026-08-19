export default {
  name: 'zayavkaSection',
  title: 'Заявка (страница формы)',
  type: 'document',
  fields: [
    { name: 'pageTitle', title: 'Заголовок', type: 'localeString' },
    { name: 'pageLead', title: 'Лид', type: 'localeText' },
  ],
  preview: { prepare: () => ({ title: 'Заявка (страница формы)' }) },
};
