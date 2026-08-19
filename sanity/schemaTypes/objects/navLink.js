export default {
  name: 'navLink',
  title: 'Ссылка',
  type: 'object',
  fields: [
    { name: 'label', title: 'Текст', type: 'localeString' },
    { name: 'href', title: 'Ссылка (например, /#servizi или /page)', type: 'string' },
  ],
  preview: { select: { title: 'label.ru', subtitle: 'href' } },
};
