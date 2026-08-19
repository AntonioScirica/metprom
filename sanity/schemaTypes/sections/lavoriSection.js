export default {
  name: 'lavoriSection',
  title: '06 — Наши работы',
  type: 'document',
  fields: [
    { name: 'lavoriEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'lavori', title: 'Работы', type: 'array', of: [{ type: 'workItem' }] },
  ],
  preview: { prepare: () => ({ title: '06 — Наши работы' }) },
};
