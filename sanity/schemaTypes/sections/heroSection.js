export default {
  name: 'heroSection',
  title: 'Слайдер (обложка)',
  type: 'document',
  fields: [
    { name: 'heroTitleLine1', title: 'Заголовок — строка 1', type: 'localeString' },
    { name: 'heroTitleLine2', title: 'Заголовок — строка 2', type: 'localeString' },
    { name: 'heroTitleLine3', title: 'Заголовок — строка 3', type: 'localeString' },
    { name: 'heroLead', title: 'Лид (текст под заголовком)', type: 'localeText' },
    { name: 'heroLocation', title: 'Локация', type: 'localeString' },
    { name: 'heroTagline', title: 'Мета-строка (Дизайн · Производство)', type: 'localeString' },
    { name: 'heroTags', title: 'Отрасли (оранжевая строка)', type: 'localeString' },
    { name: 'ctaPrimaryLabel', title: 'Текст основной кнопки', type: 'localeString' },
    { name: 'ctaSecondaryLabel', title: 'Текст второй кнопки', type: 'localeString' },
    { name: 'heroVideo', title: 'Видео обложки (mp4)', type: 'file', options: { accept: 'video/mp4' } },
  ],
  preview: { prepare: () => ({ title: 'Слайдер (обложка)' }) },
};
