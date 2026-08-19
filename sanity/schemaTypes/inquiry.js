export default {
  name: 'inquiry',
  title: 'Заявки с сайта',
  type: 'document',
  fields: [
    { name: 'name', title: 'Имя', type: 'string' },
    { name: 'company', title: 'Компания', type: 'string' },
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'message', title: 'Сообщение', type: 'text' },
    { name: 'attachment', title: 'Файл (чертёж, фото)', type: 'file' },
    { name: 'createdAt', title: 'Дата', type: 'datetime' },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: { list: ['new', 'in progress', 'closed'] },
      initialValue: 'new',
    },
  ],
  orderings: [{ title: 'Сначала новые', name: 'createdDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'company', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({ title: title || 'Без имени', subtitle: `${subtitle || ''} · ${status || ''}` }),
  },
};
