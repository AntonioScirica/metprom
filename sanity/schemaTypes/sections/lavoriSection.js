export default {
  name: 'lavoriSection',
  title: '06 — Our Work',
  type: 'document',
  fields: [
    { name: 'lavoriEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'lavori', title: 'Works', type: 'array', of: [{ type: 'workItem' }] },
  ],
  preview: { prepare: () => ({ title: '06 — Our Work' }) },
};
