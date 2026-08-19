export default {
  name: 'statItem',
  title: 'Показатель',
  type: 'object',
  fields: [
    { name: 'value', title: 'Значение', type: 'number' },
    { name: 'suffix', title: 'Суффикс (+ / %)', type: 'string' },
    { name: 'label', title: 'Подпись', type: 'localeString' },
  ],
  preview: { select: { title: 'label.ru', subtitle: 'value' } },
};
