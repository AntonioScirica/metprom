export default {
  name: 'navbar',
  title: 'Навбар',
  type: 'document',
  fields: [
    { name: 'links', title: 'Пункты меню', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'infoDropdownLabel', title: 'Подпись выпадающего меню «Инфо»', type: 'localeString' },
    { name: 'infoDropdownLinks', title: 'Пункты выпадающего меню «Инфо»', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'ctaLabel', title: 'Текст CTA-кнопки', type: 'localeString' },
    { name: 'ctaHref', title: 'Ссылка CTA-кнопки', type: 'string' },
  ],
  preview: { prepare: () => ({ title: 'Навбар' }) },
};
