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
  { order: '01', title: L('Оборудование на заказ', 'Custom equipment', 'Attrezzature su misura'), description: L('Проектирование и изготовление специализированных машин для сельского хозяйства и пищевой промышленности. Отталкиваемся от вашей задачи, технического чертежа или физического образца.', 'Design and manufacture of specialized machines for agriculture and the food industry. We start from your need, technical drawing or physical sample.', 'Progettazione e costruzione di macchine dedicate per il settore agricolo e alimentare. Partiamo dalla tua esigenza, dal tuo disegno tecnico o da un campione fisico.'), file: 'servizio-attrezzature.jpg' },
  { order: '02', title: L('Запчасти и комплектующие', 'Spare parts & components', 'Ricambi & componenti'), description: L('Шестерни, валы, шкивы, ролики и запасные части для сельского хозяйства, пищевой и тяжёлой промышленности — в том числе для снятого с производства оборудования.', 'Gears, shafts, pulleys, rollers and spare parts for agriculture, food and heavy industry — including for discontinued machinery.', 'Ingranaggi, alberi, pulegge, rulli e componenti di ricambio per agricoltura, alimentare e industria pesante — anche per macchinari fuori produzione.'), file: 'servizio-ricambi.jpg' },
  { order: '03', title: L('Литьё и ковка', 'Casting & forging', 'Fusione & forgiatura'), description: L('Литьё чёрных и цветных металлов, ковка и производство поковок для конструкционных и механических деталей по спецификации.', 'Casting of ferrous and non-ferrous metals, forging and production of forgings for structural and mechanical parts to specification.', 'Fusione di metalli ferrosi e non ferrosi, forgiatura e produzione di forgiati per componenti strutturali e meccanici su specifica.'), file: 'servizio-fusione.jpg' },
  { order: '04', title: L('Полимеры и техническая резина', 'Polymers & technical rubber', 'Polimeri & gomma tecnica'), description: L('Обработка пластика, фторопласта, капролона, технолита и технической резины для промышленных деталей, подверженных износу.', 'Machining of plastic, PTFE, nylon, technolite and technical rubber for wear-prone industrial parts.', 'Lavorazione di plastica, fluoroplastica, caprolon, tecnolite e gomma tecnica per componenti industriali soggetti a usura.'), file: 'servizio-polimeri.jpg' },
];

const SECTORS = [
  { order: '01', title: L('Сельское хозяйство и животноводство', 'Agriculture & livestock', 'Agricoltura & zootecnia'), file: 'settore-agricoltura.jpg' },
  { order: '02', title: L('Пищевая промышленность', 'Food industry', 'Industria alimentare'), file: 'settore-alimentare.jpg' },
  { order: '03', title: L('Тяжёлая промышленность', 'Heavy industry', 'Industria pesante'), file: 'settore-pesante.jpg' },
];

const WORKS = [
  { order: 1, title: L('Червячная шестерня', 'Worm gear', 'Ingranaggio a vite'), file: 'ingranaggio-vite.jpg' },
  { order: 2, title: L('Конические валы', 'Bevel shafts', 'Alberi conici'), file: 'alberi-conici.jpg' },
  { order: 3, title: L('Ёмкость под давлением', 'Pressure vessel', 'Serbatoio in pressione'), file: 'serbatoio-pressione.jpg' },
  { order: 4, title: L('Резиновые ролики', 'Rubber rollers', 'Rulli gommati'), file: 'rulli-gommati.jpg' },
  { order: 5, title: L('Крыльчатки', 'Impellers', 'Giranti'), file: 'giranti.jpg' },
  { order: 6, title: L('Зубчатый диск', 'Toothed disc', 'Disco dentato'), file: 'disco-dentato.jpg' },
  { order: 7, title: L('Машина MPG-T2', 'MPG-T2 machine', 'Macchina MPG-T2'), file: 'macchina-mpg-t2.jpg' },
  { order: 8, title: L('Комплектующие на заказ', 'Custom components', 'Componenti custom'), file: 'componenti-custom.jpg' },
];

const STEPS = [
  { order: '01', title: L('Заявка', 'Request', 'Richiesta'), text: L('Расскажите нам о задаче: идея, чертёж или сломанная деталь, которую нужно заменить.', 'Tell us about the task: an idea, a drawing, or a broken part to replace.', "Ci racconti l'esigenza: un'idea, un disegno o un pezzo rotto da sostituire.") },
  { order: '02', title: L('Проектирование', 'Design', 'Progettazione'), text: L('Техническая документация под заказ — наша или на основе вашей.', 'Custom technical documentation — ours or based on yours.', 'Documentazione tecnica su misura, nostra o basata sulla tua.') },
  { order: '03', title: L('Производство', 'Production', 'Produzione'), text: L('Изготовление в цехе или поставка от проверенных поставщиков.', 'In-house manufacturing or procurement from trusted suppliers.', 'Costruzione in officina oppure procurement da fornitori selezionati.') },
  { order: '04', title: L('Испытание', 'Testing', 'Collaudo'), text: L('Контроль размеров и функциональности перед отправкой.', 'Dimensional and functional inspection before shipping.', 'Controllo dimensionale e funzionale prima della spedizione.') },
  { order: '05', title: L('Доставка', 'Delivery', 'Consegna'), text: L('Установка, ввод в эксплуатацию и послепродажное обслуживание.', 'Installation, commissioning and after-sales support.', 'Installazione, messa in servizio e assistenza post-vendita.') },
];

const INFO_PAGES = [
  { id: 'oKompaniiPage', type: 'oKompaniiPage', title: L('О компании', 'About us', 'Chi siamo'), text: L('История, структура и сертификаты компании — материалы уточняются.', 'History, structure and company certifications — details to be confirmed.', "Storia, struttura e certificazioni dell'azienda — materiali in aggiornamento.") },
  { id: 'pokupatelyamPage', type: 'pokupatelyamPage', title: L('Покупателям', 'For customers', 'Per i clienti'), text: L('Условия заказа, оплаты и доставки — материалы уточняются.', 'Ordering, payment and delivery terms — details to be confirmed.', 'Condizioni di ordine, pagamento e consegna — materiali in aggiornamento.') },
  { id: 'bibliotekaPage', type: 'bibliotekaPage', title: L('Библиотека', 'Library', 'Libreria'), text: L('Сертификаты, каталоги и чертежи для скачивания — материалы уточняются.', 'Certificates, catalogs and drawings for download — details to be confirmed.', 'Certificati, cataloghi e disegni da scaricare — materiali in aggiornamento.') },
  { id: 'vakansiiPage', type: 'vakansiiPage', title: L('Вакансии', 'Careers', 'Lavora con noi'), text: L('Открытые позиции — материалы уточняются.', 'Open positions — details to be confirmed.', 'Posizioni aperte — materiali in aggiornamento.') },
];

async function run() {
  console.log('Svuoto documenti gestiti esistenti...');
  await client.delete({ query: '*[_id in ["homePage","navbar","footer","others","oKompaniiPage","pokupatelyamPage","bibliotekaPage","vakansiiPage"]]' });

  console.log('Preparo servizi...');
  const servizi = [];
  for (const s of SERVICES) servizi.push({ _key: s.order, _type: 'serviceItem', order: s.order, title: s.title, description: s.description, photo: await uploadImage(s.file) });

  console.log('Preparo settori...');
  const settori = [];
  for (const s of SECTORS) settori.push({ _key: s.order, _type: 'sectorItem', order: s.order, title: s.title, photo: await uploadImage(s.file) });

  console.log('Preparo lavori...');
  const lavori = [];
  for (const w of WORKS) lavori.push({ _key: String(w.order), _type: 'workItem', order: w.order, title: w.title, photo: await uploadImage(w.file) });

  const processo = STEPS.map((s) => ({ _key: s.order, _type: 'stepItem', ...s }));
  const numeri = [
    { _key: 'anni', _type: 'statItem', value: 30, suffix: '+', label: L('Лет работы', 'Years in business', 'Anni di attività') },
    { _key: 'pezzi', _type: 'statItem', value: 500, suffix: '+', label: L('Изготовленных деталей', 'Parts manufactured', 'Pezzi realizzati') },
    { _key: 'settori', _type: 'statItem', value: 3, suffix: '', label: L('Обслуживаемых отраслей', 'Industries served', 'Settori serviti') },
    { _key: 'misura', _type: 'statItem', value: 100, suffix: '%', label: L('Под заказ', 'Custom-made', 'Su misura') },
  ];

  console.log('Carico video hero...');
  const heroVideo = await uploadVideo('hero-loop.mp4');

  console.log('Creo pagina Home...');
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',

    heroTitleLine1: L('От чертежа', 'From drawing', 'Dal disegno'),
    heroTitleLine2: L('к готовой', 'to a finished', 'alla macchina'),
    heroTitleLine3: L('машине.', 'machine.', 'finita.'),
    heroLead: L('Принесите чертёж, образец или просто опишите задачу. Мы спроектируем, изготовим и поставим машину. То, что не производим сами — закупим у проверенных поставщиков.', "Bring us a drawing, a sample, or simply describe the need. We'll design, build and deliver the machine. What we don't make ourselves, we source from trusted suppliers.", "Ci porti un disegno, un campione o solo un'esigenza. Noi progettiamo, costruiamo e consegniamo la macchina. Quello che non produciamo, lo procuriamo."),
    heroLocation: L('Донецк · Осн. —', 'Donetsk · Est. —', 'Donetsk · Fondata —'),
    heroTagline: L('Проектирование · Производство', 'Design · Production', 'Progettazione · Produzione'),
    heroTags: L('Сельское хоз-во / Пищевая пром. / Тяжёлая пром.', 'Agriculture / Food industry / Heavy industry', 'Agricoltura / Alimentare / Pesante'),
    ctaPrimaryLabel: L('Запросить смету', 'Request a quote', 'Richiedi un preventivo'),
    ctaSecondaryLabel: L('Как мы работаем', 'How we work', 'Come lavoriamo'),
    heroVideo,

    metodoEyebrow: L('02 — Метод', '02 — Method', '02 — Metodo'),
    metodoFigure: L('Рис. 01 → MPG-T2', 'Fig. 01 → MPG-T2', 'Fig. 01 → MPG-T2'),
    claimTitle: L('То, что существует только на бумаге, мы запускаем в производство.', 'What exists only on paper, we put into production.', 'Quello che esiste solo su carta, noi lo mettiamo in produzione.'),
    claimText: L('Один партнёр от чертежа до поставки: проектирование, изготовление в цехе или закупка, испытания и монтаж. Клиент общается с нами, а не с пятью разными поставщиками.', 'One single partner from technical drawing to delivery: design, in-house manufacturing or procurement, testing and installation. The client talks to us, not to five different suppliers.', 'Un solo interlocutore dal disegno tecnico alla consegna: progettazione, costruzione in officina o procurement, collaudo e installazione. Il cliente parla con noi, non con cinque fornitori diversi.'),

    serviziEyebrow: L('03 — Что мы делаем', '03 — What we do', '03 — Cosa facciamo'),
    serviziCountLabel: L('направления', 'areas', 'aree'),
    servizi,

    settoriEyebrow: L('04 — Отрасли', '04 — Industries', '04 — Settori'),
    settoriCountLabel: L('отрасли', 'industries', 'industrie'),
    settori,

    numeriEyebrow: L('05 — Цифры', '05 — Numbers', '05 — Numeri'),
    numeriNote: L('данные уточняются', 'figures to be confirmed', 'dati da confermare'),
    numeri,

    lavoriEyebrow: L('06 — Наши работы', '06 — Our work', '06 — I nostri lavori'),
    lavori,

    processoEyebrow: L('07 — Процесс', '07 — Process', '07 — Processo'),
    processoCountLabel: L('этапов', 'steps', 'fasi'),
    processo,

    contattiEyebrow: L('08 — Контакты', '08 — Contacts', '08 — Contatti'),
    ctaTitle: L('Нужно изготовить деталь или спроектировать машину?', 'Need a part made or a machine designed?', 'Hai un pezzo da rifare o una macchina da progettare?'),
    phone: '+38 (071) 109-9-009',
    whatsapp: '+38 (071) 309-9-009',
    email: 'info@metpromgroup.ru',

    seo: { metaTitle: 'Met Prom Group — машины и промышленные комплектующие на заказ', metaDescription: 'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.' },
  });

  console.log('Creo pagine info...');
  for (const p of INFO_PAGES) {
    await client.createOrReplace({ _id: p.id, _type: p.type, title: p.title, text: p.text });
  }

  const NAV_LINKS = [
    { _key: 'metodo', _type: 'navLink', label: L('Метод', 'Method', 'Metodo'), href: '/#metodo' },
    { _key: 'servizi', _type: 'navLink', label: L('Услуги', 'Services', 'Servizi'), href: '/#servizi' },
    { _key: 'settori', _type: 'navLink', label: L('Отрасли', 'Industries', 'Settori'), href: '/#settori' },
    { _key: 'lavori', _type: 'navLink', label: L('Работы', 'Work', 'Lavori'), href: '/#lavori' },
  ];
  const INFO_LINKS = [
    { _key: 'o-kompanii', _type: 'navLink', label: L('О компании', 'About us', 'Chi siamo'), href: '/o-kompanii' },
    { _key: 'pokupatelyam', _type: 'navLink', label: L('Покупателям', 'For customers', 'Per i clienti'), href: '/pokupatelyam' },
    { _key: 'biblioteka', _type: 'navLink', label: L('Библиотека', 'Library', 'Libreria'), href: '/biblioteka' },
    { _key: 'vakansii', _type: 'navLink', label: L('Вакансии', 'Careers', 'Lavora con noi'), href: '/vakansii' },
  ];

  console.log('Creo Navbar...');
  await client.createOrReplace({
    _id: 'navbar',
    _type: 'navbar',
    links: [...NAV_LINKS, { _key: 'contatti', _type: 'navLink', label: L('Контакты', 'Contacts', 'Contatti'), href: '/#contatti' }],
    infoDropdownLabel: L('Информация', 'Information', 'Informazioni'),
    infoDropdownLinks: INFO_LINKS,
    ctaLabel: L('Смета', 'Quote', 'Preventivo'),
    ctaHref: '/#contatti',
  });

  console.log('Creo Footer...');
  await client.createOrReplace({
    _id: 'footer',
    _type: 'footer',
    description: L('Проектирование и производство машин и промышленных комплектующих на заказ.', 'Design and manufacture of custom machines and industrial components.', 'Progettazione e produzione di macchine e componenti industriali su misura.'),
    siteLinks: NAV_LINKS,
    infoLinks: INFO_LINKS,
    copyright: '© 2026 Met Prom Group',
    legalText: L('Конфиденциальность · Cookie', 'Privacy · Cookies', 'Privacy · Cookie'),
  });

  console.log('Creo Others...');
  await client.createOrReplace({
    _id: 'others',
    _type: 'others',
    siteTitle: 'Met Prom Group',
  });

  console.log('Fatto.');
}

run().catch((err) => { console.error(err); process.exit(1); });
