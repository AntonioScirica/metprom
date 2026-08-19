export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    { name: 'description', title: 'Text under the logo', type: 'localeText' },
    { name: 'siteColumnLabel', title: 'Column title "Site"', type: 'localeString' },
    { name: 'siteLinks', title: 'Column "Site"', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'infoColumnLabel', title: 'Column title "Information"', type: 'localeString' },
    { name: 'infoLinks', title: 'Column "Information"', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'legalEntityLine', title: 'Legal entity line (company, city, tax ID)', type: 'localeString' },
    { name: 'copyright', title: 'Copyright text', type: 'string' },
    { name: 'privacyLabel', title: 'Privacy link text', type: 'localeString' },
    { name: 'cookieLabel', title: 'Cookie link text', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: 'Footer' }) },
};
