import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.join(__dirname, '..', 'public', 'img');
const VIDEO = path.join(__dirname, '..', 'public', 'video');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(filename) {
  const filePath = path.join(IMG, filename);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function uploadVideo(filename) {
  const filePath = path.join(VIDEO, filename);
  const asset = await client.assets.upload('file', fs.createReadStream(filePath), { filename });
  return { _type: 'file', asset: { _type: 'reference', _ref: asset._id } };
}

const L = (ru, en) => ({ ru, en });

const SERVICES = [
  { order: '01', title: L('Оборудование на заказ', 'Custom equipment'), description: L('Проектирование и изготовление специализированных машин для сельского хозяйства и пищевой промышленности. Отталкиваемся от вашей задачи, технического чертежа или физического образца.', 'Design and manufacture of specialized machines for agriculture and the food industry. We start from your need, technical drawing or physical sample.'), file: 'servizio-attrezzature.jpg' },
  { order: '02', title: L('Запчасти и комплектующие', 'Spare parts & components'), description: L('Шестерни, валы, шкивы, ролики и запасные части для сельского хозяйства, пищевой и тяжёлой промышленности — в том числе для снятого с производства оборудования.', 'Gears, shafts, pulleys, rollers and spare parts for agriculture, food and heavy industry — including for discontinued machinery.'), file: 'servizio-ricambi.jpg' },
  { order: '03', title: L('Литьё и ковка', 'Casting & forging'), description: L('Литьё чёрных и цветных металлов, ковка и производство поковок для конструкционных и механических деталей по спецификации.', 'Casting of ferrous and non-ferrous metals, forging and production of forgings for structural and mechanical parts to specification.'), file: 'servizio-fusione.jpg' },
  { order: '04', title: L('Полимеры и техническая резина', 'Polymers & technical rubber'), description: L('Обработка пластика, фторопласта, капролона, технолита и технической резины для промышленных деталей, подверженных износу.', 'Machining of plastic, PTFE, nylon, technolite and technical rubber for wear-prone industrial parts.'), file: 'servizio-polimeri.jpg' },
];

const SECTORS = [
  { order: '01', title: L('Сельское хозяйство и животноводство', 'Agriculture & livestock'), file: 'settore-agricoltura.jpg', video: 'settore-agricoltura.mp4' },
  { order: '02', title: L('Пищевая промышленность', 'Food industry'), file: 'settore-alimentare.jpg', video: 'settore-alimentare.mp4' },
  { order: '03', title: L('Тяжёлая промышленность', 'Heavy industry'), file: 'settore-pesante.jpg', video: 'settore-pesante.mp4' },
];

const WORKS = [
  { order: 1, title: L('Червячная шестерня', 'Worm gear'), file: 'ingranaggio-vite.jpg' },
  { order: 2, title: L('Конические валы', 'Bevel shafts'), file: 'alberi-conici.jpg' },
  { order: 3, title: L('Ёмкость под давлением', 'Pressure vessel'), file: 'serbatoio-pressione.jpg' },
  { order: 4, title: L('Резиновые ролики', 'Rubber rollers'), file: 'rulli-gommati.jpg' },
  { order: 5, title: L('Крыльчатки', 'Impellers'), file: 'giranti.jpg' },
  { order: 6, title: L('Зубчатый диск', 'Toothed disc'), file: 'disco-dentato.jpg' },
  { order: 7, title: L('Машина MPG-T2', 'MPG-T2 machine'), file: 'macchina-mpg-t2.jpg' },
  { order: 8, title: L('Комплектующие на заказ', 'Custom components'), file: 'componenti-custom.jpg' },
];

const STEPS = [
  { order: '01', title: L('Заявка', 'Request'), text: L('Расскажите нам о задаче: идея, чертёж или сломанная деталь, которую нужно заменить.', 'Tell us about the task: an idea, a drawing, or a broken part to replace.') },
  { order: '02', title: L('Проектирование', 'Design'), text: L('Техническая документация под заказ — наша или на основе вашей.', 'Custom technical documentation — ours or based on yours.') },
  { order: '03', title: L('Производство', 'Production'), text: L('Изготовление в цехе или поставка от проверенных поставщиков.', 'In-house manufacturing or procurement from trusted suppliers.') },
  { order: '04', title: L('Испытание', 'Testing'), text: L('Контроль размеров и функциональности перед отправкой.', 'Dimensional and functional inspection before shipping.') },
  { order: '05', title: L('Доставка', 'Delivery'), text: L('Установка, ввод в эксплуатацию и послепродажное обслуживание.', 'Installation, commissioning and after-sales support.') },
];

const INFO_PAGES = [
  { id: 'oKompaniiPage', type: 'oKompaniiPage', title: L('О компании', 'About us'), text: L('История, структура и сертификаты компании — материалы уточняются.', 'History, structure and company certifications — details to be confirmed.') },
  { id: 'pokupatelyamPage', type: 'pokupatelyamPage', title: L('Покупателям', 'For customers'), text: L('Условия заказа, оплаты и доставки — материалы уточняются.', 'Ordering, payment and delivery terms — details to be confirmed.') },
  { id: 'bibliotekaPage', type: 'bibliotekaPage', title: L('Библиотека', 'Library'), text: L('Сертификаты, каталоги и чертежи для скачивания — материалы уточняются.', 'Certificates, catalogs and drawings for download — details to be confirmed.') },
  { id: 'vakansiiPage', type: 'vakansiiPage', title: L('Вакансии', 'Careers'), text: L('Открытые позиции — материалы уточняются.', 'Open positions — details to be confirmed.') },
];

async function run() {
  console.log('Svuoto documenti gestiti esistenti...');
  await client.delete({
    query: '*[_id in ["heroSection","tickerSection","animationSection","metodoSection","serviziSection","settoriSection","numeriSection","lavoriSection","processoSection","contattiSection","seoSettings","navbar","footer","others","oKompaniiPage","pokupatelyamPage","bibliotekaPage","vakansiiPage"]]',
  });

  console.log('Preparo servizi...');
  const servizi = [];
  for (const s of SERVICES) servizi.push({ _key: s.order, _type: 'serviceItem', order: s.order, title: s.title, description: s.description, photo: await uploadImage(s.file) });

  console.log('Preparo settori...');
  const settori = [];
  for (const s of SECTORS) settori.push({ _key: s.order, _type: 'sectorItem', order: s.order, title: s.title, photo: await uploadImage(s.file), video: await uploadVideo(s.video) });

  console.log('Preparo lavori...');
  const lavori = [];
  for (const w of WORKS) lavori.push({ _key: String(w.order), _type: 'workItem', order: w.order, title: w.title, photo: await uploadImage(w.file) });

  const processo = STEPS.map((s) => ({ _key: s.order, _type: 'stepItem', ...s }));
  const numeri = [
    { _key: 'anni', _type: 'statItem', value: 30, suffix: '+', label: L('Лет работы', 'Years in business') },
    { _key: 'pezzi', _type: 'statItem', value: 500, suffix: '+', label: L('Изготовленных деталей', 'Parts manufactured') },
    { _key: 'settori', _type: 'statItem', value: 3, suffix: '', label: L('Обслуживаемых отраслей', 'Industries served') },
    { _key: 'misura', _type: 'statItem', value: 100, suffix: '%', label: L('Под заказ', 'Custom-made') },
  ];

  console.log('Carico video hero...');
  const heroVideo = await uploadVideo('hero-loop.mp4');

  console.log('Creo Slider (copertina)...');
  await client.createOrReplace({
    _id: 'heroSection',
    _type: 'heroSection',
    heroTitleLine1: L('От чертежа', 'From drawing'),
    heroTitleLine2: L('к готовой', 'to a finished'),
    heroTitleLine3: L('машине.', 'machine.'),
    heroLead: L('Принесите чертёж, образец или просто опишите задачу. Мы спроектируем, изготовим и поставим машину. То, что не производим сами — закупим у проверенных поставщиков.', "Bring us a drawing, a sample, or simply describe the need. We'll design, build and deliver the machine. What we don't make ourselves, we source from trusted suppliers."),
    heroLocation: L('Донецк · Осн. —', 'Donetsk · Est. —'),
    heroTagline: L('Проектирование · Производство', 'Design · Production'),
    heroTags: L('Сельское хоз-во / Пищевая пром. / Тяжёлая пром.', 'Agriculture / Food industry / Heavy industry'),
    ctaPrimaryLabel: L('Запросить смету', 'Request a quote'),
    ctaSecondaryLabel: L('Как мы работаем', 'How we work'),
    heroVideo,
  });

  console.log('Creo Ticker...');
  await client.createOrReplace({
    _id: 'tickerSection',
    _type: 'tickerSection',
    items: [
      { _key: '01', _type: 'localeString', ...L('Оборудование на заказ', 'Custom equipment') },
      { _key: '02', _type: 'localeString', ...L('Запчасти и комплектующие', 'Spare parts & components') },
      { _key: '03', _type: 'localeString', ...L('Литьё и ковка', 'Casting & forging') },
      { _key: '04', _type: 'localeString', ...L('Полимеры и техническая резина', 'Polymers & technical rubber') },
    ],
  });

  console.log('Creo 01 — Animazione...');
  await client.createOrReplace({
    _id: 'animationSection',
    _type: 'animationSection',
    stageTitle: L('01 — От чертежа к машине', '01 — From drawing to machine'),
    phases: [
      { _key: '01', order: '01', label: L('Контур', 'Outline') },
      { _key: '02', order: '02', label: L('Чертёж', 'Drawing') },
      { _key: '03', order: '03', label: L('Без размеров', 'No dimensions') },
      { _key: '04', order: '04', label: L('Обретает форму', 'Takes shape') },
      { _key: '05', order: '05', label: L('Машина готова', 'Machine ready') },
    ],
    machineLabel: L('MPG-T2 / ОСНОВНОЙ УЗЕЛ', 'MPG-T2 / MAIN ASSEMBLY'),
    scaleLabel: L('МАСШТАБ 1:10', 'SCALE 1:10'),
    revLabel: L('РЕД. 01 · 1/1', 'REV. 01 · 1/1'),
    tolerancesNote: L('ДОПУСКИ ISO 2768-mK', 'TOLERANCES ISO 2768-mK'),
    materialNote: L('МАТ. S235JR / AISI 304', 'MAT. S235JR / AISI 304'),
    weldingNote: L('СВАРКА EN ISO 5817-C', 'WELDING EN ISO 5817-C'),
    finishNote: L('ШЕРОХОВАТОСТЬ RA 3.2', 'FINISH RA 3.2'),
    sectionLabel: L('СЕЧ. A–A', 'SECT. A–A'),
  });

  console.log('Creo 02 — Metodo...');
  await client.createOrReplace({
    _id: 'metodoSection',
    _type: 'metodoSection',
    metodoEyebrow: L('02 — Метод', '02 — Method'),
    metodoFigure: L('Рис. 01 → MPG-T2', 'Fig. 01 → MPG-T2'),
    claimTitle: L('То, что существует только на бумаге, мы запускаем в производство.', 'What exists only on paper, we put into production.'),
    claimText: L('Один партнёр от чертежа до поставки: проектирование, изготовление в цехе или закупка, испытания и монтаж. Клиент общается с нами, а не с пятью разными поставщиками.', 'One single partner from technical drawing to delivery: design, in-house manufacturing or procurement, testing and installation. The client talks to us, not to five different suppliers.'),
  });

  console.log('Creo 02 — Servizi...');
  await client.createOrReplace({
    _id: 'serviziSection',
    _type: 'serviziSection',
    serviziEyebrow: L('03 — Что мы делаем', '03 — What we do'),
    serviziCountLabel: L('направления', 'areas'),
    servizi,
  });

  console.log('Creo 03 — Settori...');
  await client.createOrReplace({
    _id: 'settoriSection',
    _type: 'settoriSection',
    settoriEyebrow: L('04 — Отрасли', '04 — Industries'),
    settoriCountLabel: L('отрасли', 'industries'),
    settori,
  });

  console.log('Creo 04 — Numeri...');
  await client.createOrReplace({
    _id: 'numeriSection',
    _type: 'numeriSection',
    numeriEyebrow: L('05 — Цифры', '05 — Numbers'),
    numeriNote: L('данные уточняются', 'figures to be confirmed'),
    numeri,
  });

  console.log('Creo 05 — Lavori...');
  await client.createOrReplace({
    _id: 'lavoriSection',
    _type: 'lavoriSection',
    lavoriEyebrow: L('06 — Наши работы', '06 — Our work'),
    lavori,
  });

  console.log('Creo 06 — Processo...');
  await client.createOrReplace({
    _id: 'processoSection',
    _type: 'processoSection',
    processoEyebrow: L('07 — Процесс', '07 — Process'),
    processoCountLabel: L('этапов', 'steps'),
    processo,
  });

  console.log('Creo 07 — Contatti...');
  await client.createOrReplace({
    _id: 'contattiSection',
    _type: 'contattiSection',
    contattiEyebrow: L('08 — Контакты', '08 — Contacts'),
    ctaTitle: L('Нужно изготовить деталь или спроектировать машину?', 'Need a part made or a machine designed?'),
    phone: '+38 (071) 109-9-009',
    whatsapp: '+38 (071) 309-9-009',
    email: 'info@rimmax.ru',
  });

  console.log('Creo SEO...');
  await client.createOrReplace({
    _id: 'seoSettings',
    _type: 'seoSettings',
    seo: { metaTitle: 'РИММАКС — машины и промышленные комплектующие на заказ', metaDescription: 'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.' },
  });

  console.log('Creo pagine info...');
  for (const p of INFO_PAGES) {
    await client.createOrReplace({ _id: p.id, _type: p.type, title: p.title, text: p.text });
  }

  const NAV_LINKS = [
    { _key: 'metodo', _type: 'navLink', label: L('Метод', 'Method'), href: '/#metodo' },
    { _key: 'servizi', _type: 'navLink', label: L('Услуги', 'Services'), href: '/#servizi' },
    { _key: 'settori', _type: 'navLink', label: L('Отрасли', 'Industries'), href: '/#settori' },
    { _key: 'lavori', _type: 'navLink', label: L('Работы', 'Work'), href: '/#lavori' },
  ];
  const INFO_LINKS = [
    { _key: 'o-kompanii', _type: 'navLink', label: L('О компании', 'About us'), href: '/o-kompanii' },
    { _key: 'pokupatelyam', _type: 'navLink', label: L('Покупателям', 'For customers'), href: '/pokupatelyam' },
    { _key: 'biblioteka', _type: 'navLink', label: L('Библиотека', 'Library'), href: '/biblioteka' },
    { _key: 'vakansii', _type: 'navLink', label: L('Вакансии', 'Careers'), href: '/vakansii' },
  ];

  console.log('Creo Navbar...');
  await client.createOrReplace({
    _id: 'navbar',
    _type: 'navbar',
    links: [...NAV_LINKS, { _key: 'contatti', _type: 'navLink', label: L('Контакты', 'Contacts'), href: '/#contatti' }],
    infoDropdownLabel: L('Информация', 'Information'),
    infoDropdownLinks: INFO_LINKS,
    ctaLabel: L('Смета', 'Quote'),
    ctaHref: '/zayavka',
  });

  console.log('Creo Footer...');
  await client.createOrReplace({
    _id: 'footer',
    _type: 'footer',
    description: L('Проектирование и производство машин и промышленных комплектующих на заказ.', 'Design and manufacture of custom machines and industrial components.'),
    siteLinks: NAV_LINKS,
    infoLinks: INFO_LINKS,
    copyright: '© 2026 РИММАКС',
    legalText: L('Конфиденциальность · Cookie', 'Privacy · Cookies'),
  });

  console.log('Creo Others...');
  await client.createOrReplace({
    _id: 'others',
    _type: 'others',
    siteTitle: 'РИММАКС',
  });

  console.log('Fatto.');
}

run().catch((err) => { console.error(err); process.exit(1); });
