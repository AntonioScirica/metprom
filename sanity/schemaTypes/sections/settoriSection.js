export default {
  name: 'settoriSection',
  title: '04 — Industries',
  type: 'document',
  fields: [
    { name: 'settoriEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'settoriCountLabel', title: 'Word after the number (e.g. "industries")', type: 'localeString' },
    { name: 'settori', title: 'Industries', type: 'array', of: [{ type: 'sectorItem' }] },
  ],
  preview: { prepare: () => ({ title: '04 — Industries' }) },
};
