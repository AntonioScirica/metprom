export default {
  name: 'statItem',
  title: 'Number',
  type: 'object',
  fields: [
    { name: 'value', title: 'Value', type: 'number' },
    { name: 'suffix', title: 'Suffix (+ / %)', type: 'string' },
    { name: 'label', title: 'Label', type: 'localeString' },
  ],
  preview: { select: { title: 'label.ru', subtitle: 'value' } },
};
