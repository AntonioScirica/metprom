export default {
  name: 'serviziSection',
  title: '03 — Services',
  type: 'document',
  fields: [
    { name: 'serviziEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'serviziCountLabel', title: 'Word after the number (e.g. "areas")', type: 'localeString' },
    { name: 'servizi', title: 'Services', type: 'array', of: [{ type: 'serviceItem' }] },
  ],
  preview: { prepare: () => ({ title: '03 — Services' }) },
};
