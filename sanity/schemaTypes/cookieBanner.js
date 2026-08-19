export default {
  name: 'cookieBanner',
  title: 'Плашка cookie',
  type: 'document',
  fields: [
    { name: 'text', title: 'Текст плашки', type: 'localeText' },
    { name: 'acceptLabel', title: 'Кнопка принятия', type: 'localeString' },
    { name: 'declineLabel', title: 'Кнопка отклонения', type: 'localeString' },
    { name: 'policyLinkLabel', title: 'Текст ссылки на политику', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: 'Плашка cookie' }) },
};
