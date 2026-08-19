export default {
  name: 'settoriSection',
  title: '04 — Отрасли',
  type: 'document',
  fields: [
    { name: 'settoriEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'settoriCountLabel', title: 'Слово после числа (например, «отраслей»)', type: 'localeString' },
    { name: 'settori', title: 'Отрасли', type: 'array', of: [{ type: 'sectorItem' }] },
  ],
  preview: { prepare: () => ({ title: '04 — Отрасли' }) },
};
