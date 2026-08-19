export default {
  name: 'others',
  title: 'Other',
  type: 'document',
  fields: [
    { name: 'siteTitle', title: 'Site name', type: 'string' },
    { name: 'infoEyebrowLabel', title: 'Info pages section label (e.g. "01 — Information")', type: 'localeString' },
    { name: 'logoSize', title: 'Logo size in header/footer (px)', type: 'number', initialValue: 85 },
  ],
  preview: { prepare: () => ({ title: 'Other' }) },
};
