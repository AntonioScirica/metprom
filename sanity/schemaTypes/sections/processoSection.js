export default {
  name: 'processoSection',
  title: '07 — Process',
  type: 'document',
  fields: [
    { name: 'processoEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'processoCountLabel', title: 'Word after the number (e.g. "steps")', type: 'localeString' },
    { name: 'processo', title: 'Process steps', type: 'array', of: [{ type: 'stepItem' }] },
  ],
  preview: { prepare: () => ({ title: '07 — Process' }) },
};
