export default {
  name: 'sectorItem',
  title: 'Отрасль',
  type: 'object',
  fields: [
    { name: 'order', title: 'Номер (01, 02...)', type: 'string' },
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'photo', title: 'Фото', type: 'image', options: { hotspot: true } },
    { name: 'video', title: 'Видео (mp4, необязательно — заменяет фото, если указано)', type: 'file', options: { accept: 'video/mp4' } },
  ],
  preview: { select: { title: 'title.ru', media: 'photo' } },
};
