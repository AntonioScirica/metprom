export default {
  name: 'animationSection',
  title: '01 — Animation',
  type: 'document',
  fields: [
    { name: 'stageTitle', title: 'Section title (top)', type: 'localeString' },
    {
      name: 'phases',
      title: 'Phases (bottom bar)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'order', title: 'Number (01, 02...)', type: 'string' },
          { name: 'label', title: 'Text', type: 'localeString' },
        ],
        preview: { select: { title: 'label.ru', subtitle: 'order' } },
      }],
    },
    { name: 'machineLabel', title: 'Machine label (title block)', type: 'localeString' },
    { name: 'scaleLabel', title: 'Scale', type: 'localeString' },
    { name: 'revLabel', title: 'Revision', type: 'localeString' },
    { name: 'tolerancesNote', title: 'Tolerances note', type: 'localeString' },
    { name: 'materialNote', title: 'Material note', type: 'localeString' },
    { name: 'weldingNote', title: 'Welding note', type: 'localeString' },
    { name: 'finishNote', title: 'Finish note', type: 'localeString' },
    { name: 'sectionLabel', title: 'Section A-A label', type: 'localeString' },
  ],
  preview: { prepare: () => ({ title: '01 — Animation' }) },
};
