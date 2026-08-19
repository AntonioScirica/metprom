export default {
  name: 'tickerSection',
  title: 'Ticker (scrolling strip)',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'localeString' }],
    },
  ],
  preview: { prepare: () => ({ title: 'Ticker (scrolling strip)' }) },
};
