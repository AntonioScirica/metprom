export default {
  name: 'heroSection',
  title: 'Slider (cover)',
  type: 'document',
  fields: [
    { name: 'heroTitleLine1', title: 'Title — line 1', type: 'localeString' },
    { name: 'heroTitleLine2', title: 'Title — line 2', type: 'localeString' },
    { name: 'heroTitleLine3', title: 'Title — line 3', type: 'localeString' },
    { name: 'heroLead', title: 'Lead (text under the title)', type: 'localeText' },
    { name: 'heroLocation', title: 'Location', type: 'localeString' },
    { name: 'heroTagline', title: 'Meta line (Design · Production)', type: 'localeString' },
    { name: 'heroTags', title: 'Industries (orange line)', type: 'localeString' },
    { name: 'ctaPrimaryLabel', title: 'Primary button text', type: 'localeString' },
    { name: 'ctaSecondaryLabel', title: 'Secondary button text', type: 'localeString' },
    { name: 'heroVideo', title: 'Cover video (mp4)', type: 'file', options: { accept: 'video/mp4' } },
  ],
  preview: { prepare: () => ({ title: 'Slider (cover)' }) },
};
