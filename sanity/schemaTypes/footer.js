export default {
  name: 'footer',
  title: 'Подвал',
  type: 'document',
  fields: [
    { name: 'description', title: 'Текст под логотипом', type: 'localeText' },
    { name: 'siteColumnLabel', title: 'Заголовок колонки «Сайт»', type: 'localeString' },
    { name: 'siteLinks', title: 'Колонка «Сайт»', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'infoColumnLabel', title: 'Заголовок колонки «Информация»', type: 'localeString' },
    { name: 'infoLinks', title: 'Колонка «Информация»', type: 'array', of: [{ type: 'navLink' }] },
    { name: 'legalEntityLine', title: 'Строка юрлица (компания, город, ИНН)', type: 'localeString' },
    { name: 'copyright', title: 'Текст копирайта', type: 'string' },
    { name: 'privacyLabel', title: 'Текст ссылки на политику конфиденциальности', type: 'localeString' },
    { name: 'cookieLabel', title: 'Текст ссылки на cookie', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: 'Подвал' }) },
};
