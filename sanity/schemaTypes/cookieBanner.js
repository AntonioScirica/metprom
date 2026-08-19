export default {
  name: 'cookieBanner',
  title: 'Cookie banner',
  type: 'document',
  fields: [
    { name: 'text', title: 'Banner text', type: 'localeText' },
    { name: 'acceptLabel', title: 'Accept button', type: 'localeString' },
    { name: 'declineLabel', title: 'Decline button', type: 'localeString' },
    { name: 'policyLinkLabel', title: 'Policy link text', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: 'Cookie banner' }) },
};
