export default {
  name: 'metodoSection',
  title: '02 — Method',
  type: 'document',
  fields: [
    { name: 'metodoEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'metodoFigure', title: 'Figure label (right side)', type: 'localeString' },
    { name: 'claimTitle', title: 'Title', type: 'localeText' },
    { name: 'claimText', title: 'Text', type: 'localeText' },
  ],
  preview: { prepare: () => ({ title: '02 — Method' }) },
};
