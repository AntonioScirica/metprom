export default {
  name: 'serviziSection',
  title: '03 — Услуги',
  type: 'document',
  fields: [
    { name: 'serviziEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'serviziCountLabel', title: 'Слово после числа (например, «направлений»)', type: 'localeString' },
    { name: 'servizi', title: 'Услуги', type: 'array', of: [{ type: 'serviceItem' }] },
  ],
  preview: { prepare: () => ({ title: '03 — Услуги' }) },
};
