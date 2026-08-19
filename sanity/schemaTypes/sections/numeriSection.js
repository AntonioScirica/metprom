export default {
  name: 'numeriSection',
  title: '05 — Цифры',
  type: 'document',
  fields: [
    { name: 'numeriEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'numeriNote', title: 'Примечание (справа)', type: 'localeString' },
    { name: 'numeri', title: 'Цифры', type: 'array', of: [{ type: 'statItem' }] },
  ],
  preview: { prepare: () => ({ title: '05 — Цифры' }) },
};
