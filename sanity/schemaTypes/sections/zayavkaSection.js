export default {
  name: 'zayavkaSection',
  title: 'Request (form page)',
  type: 'document',
  fields: [
    { name: 'pageTitle', title: 'Title', type: 'localeString' },
    { name: 'pageLead', title: 'Lead', type: 'localeText' },
  ],
  preview: { prepare: () => ({ title: 'Request (form page)' }) },
};
