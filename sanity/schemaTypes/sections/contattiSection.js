export default {
  name: 'contattiSection',
  title: '08 — Контакты',
  type: 'document',
  fields: [
    { name: 'contattiEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'ctaTitle', title: 'Заголовок финального CTA', type: 'localeText' },
    { name: 'phoneLabel', title: 'Подпись телефона', type: 'localeString' },
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'whatsappLabel', title: 'Подпись WhatsApp', type: 'localeString' },
    { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
    { name: 'emailLabel', title: 'Подпись Email', type: 'localeString' },
    { name: 'email', title: 'Email', type: 'string' },
  ],
  preview: { prepare: () => ({ title: '08 — Контакты' }) },
};
