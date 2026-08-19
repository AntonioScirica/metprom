export default {
  name: 'numeriSection',
  title: '05 — Numbers',
  type: 'document',
  fields: [
    { name: 'numeriEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'numeriNote', title: 'Note (right side)', type: 'localeString' },
    { name: 'numeri', title: 'Numbers', type: 'array', of: [{ type: 'statItem' }] },
  ],
  preview: { prepare: () => ({ title: '05 — Numbers' }) },
};
