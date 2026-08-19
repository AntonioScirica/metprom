export default {
  name: 'others',
  title: 'Прочее',
  type: 'document',
  fields: [
    { name: 'siteTitle', title: 'Название сайта', type: 'string' },
    { name: 'infoEyebrowLabel', title: 'Подпись раздела инфостраниц (например, «01 — Информация»)', type: 'localeString' },
    { name: 'logoSize', title: 'Размер логотипа в шапке/подвале (px)', type: 'number', initialValue: 85 },
  ],
  preview: { prepare: () => ({ title: 'Прочее' }) },
};
