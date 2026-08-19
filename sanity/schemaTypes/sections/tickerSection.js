export default {
  name: 'tickerSection',
  title: 'Бегущая строка',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Элементы',
      type: 'array',
      of: [{ type: 'localeString' }],
    },
  ],
  preview: { prepare: () => ({ title: 'Бегущая строка' }) },
};
