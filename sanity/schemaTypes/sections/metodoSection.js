export default {
  name: 'metodoSection',
  title: '02 — Метод',
  type: 'document',
  fields: [
    { name: 'metodoEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'metodoFigure', title: 'Подпись рисунка (справа)', type: 'localeString' },
    { name: 'claimTitle', title: 'Заголовок', type: 'localeText' },
    { name: 'claimText', title: 'Текст', type: 'localeText' },
  ],
  preview: { prepare: () => ({ title: '02 — Метод' }) },
};
