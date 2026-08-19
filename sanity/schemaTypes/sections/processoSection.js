export default {
  name: 'processoSection',
  title: '07 — Процесс',
  type: 'document',
  fields: [
    { name: 'processoEyebrow', title: 'Подпись раздела', type: 'localeString' },
    { name: 'processoCountLabel', title: 'Слово после числа (например, «шагов»)', type: 'localeString' },
    { name: 'processo', title: 'Этапы процесса', type: 'array', of: [{ type: 'stepItem' }] },
  ],
  preview: { prepare: () => ({ title: '07 — Процесс' }) },
};
