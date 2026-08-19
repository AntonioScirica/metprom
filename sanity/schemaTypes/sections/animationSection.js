export default {
  name: 'animationSection',
  title: '01 — Анимация',
  type: 'document',
  fields: [
    { name: 'stageTitle', title: 'Заголовок раздела (сверху)', type: 'localeString' },
    {
      name: 'phases',
      title: 'Этапы (нижняя панель)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'order', title: 'Номер (01, 02...)', type: 'string' },
          { name: 'label', title: 'Текст', type: 'localeString' },
        ],
        preview: { select: { title: 'label.ru', subtitle: 'order' } },
      }],
    },
    { name: 'machineLabel', title: 'Подпись изделия (штамп)', type: 'localeString' },
    { name: 'scaleLabel', title: 'Масштаб', type: 'localeString' },
    { name: 'revLabel', title: 'Версия', type: 'localeString' },
    { name: 'tolerancesNote', title: 'Примечание о допусках', type: 'localeString' },
    { name: 'materialNote', title: 'Примечание о материале', type: 'localeString' },
    { name: 'weldingNote', title: 'Примечание о сварке', type: 'localeString' },
    { name: 'finishNote', title: 'Примечание об отделке', type: 'localeString' },
    { name: 'sectionLabel', title: 'Подпись сечения А-А', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: '01 — Анимация' }) },
};
