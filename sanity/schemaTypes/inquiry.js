export default {
  name: 'inquiry',
  title: 'Website leads',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'attachment', title: 'File (drawing, photo)', type: 'file' },
    { name: 'createdAt', title: 'Date', type: 'datetime' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['new', 'in progress', 'closed'] },
      initialValue: 'new',
    },
  ],
  orderings: [{ title: 'Newest first', name: 'createdDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'company', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({ title: title || 'No name', subtitle: `${subtitle || ''} · ${status || ''}` }),
  },
};
