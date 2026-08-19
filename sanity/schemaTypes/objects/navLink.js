export default {
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    { name: 'label', title: 'Text', type: 'localeString' },
    { name: 'href', title: 'Link (e.g. /#servizi or /page)', type: 'string' },
  ],
  preview: { select: { title: 'label.ru', subtitle: 'href' } },
};
