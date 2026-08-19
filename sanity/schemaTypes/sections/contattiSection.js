export default {
  name: 'contattiSection',
  title: '08 — Contacts',
  type: 'document',
  fields: [
    { name: 'contattiEyebrow', title: 'Section label', type: 'localeString' },
    { name: 'ctaTitle', title: 'Final CTA title', type: 'localeText' },
    { name: 'phoneLabel', title: 'Phone label', type: 'localeString' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'whatsappLabel', title: 'WhatsApp label', type: 'localeString' },
    { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
    { name: 'emailLabel', title: 'Email label', type: 'localeString' },
    { name: 'email', title: 'Email', type: 'string' },
  ],
  preview: { prepare: () => ({ title: '08 — Contacts' }) },
};
