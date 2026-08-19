export default {
  name: 'sectorItem',
  title: 'Industry',
  type: 'object',
  fields: [
    { name: 'order', title: 'Number (01, 02...)', type: 'string' },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'video', title: 'Video (mp4, optional — replaces the photo if set)', type: 'file', options: { accept: 'video/mp4' } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
