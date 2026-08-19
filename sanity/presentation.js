const INFO_ROUTES = {
  oKompaniiPage: '/o-kompanii',
  pokupatelyamPage: '/pokupatelyam',
  bibliotekaPage: '/biblioteka',
  vakansiiPage: '/vakansii',
  privacyPage: '/privacy',
  cookiePage: '/cookie',
};

const HOME_TYPES = new Set([
  'heroSection', 'animationSection', 'tickerSection', 'metodoSection',
  'serviziSection', 'settoriSection', 'numeriSection', 'lavoriSection',
  'processoSection', 'contattiSection', 'seoSettings', 'navbar', 'footer', 'others',
]);

const OTHER_ROUTES = {
  zayavkaSection: {href: '/zayavka', title: 'Форма заявки'},
  contactFormSettings: {href: '/zayavka', title: 'Форма заявки'},
  cookieBanner: {href: '/', title: 'Плашка cookie'},
};

export const resolve = {
  locations: (params, {document}) => {
    const type = document?._type;
    if (INFO_ROUTES[type]) {
      return {locations: [{title: document.title?.ru || type, href: INFO_ROUTES[type]}]};
    }
    if (HOME_TYPES.has(type)) {
      return {locations: [{title: 'Главная', href: '/'}]};
    }
    if (OTHER_ROUTES[type]) {
      return {locations: [OTHER_ROUTES[type]]};
    }
    return null;
  },
};

export const previewUrl = {
  preview: '/',
  previewMode: {
    enable: '/api/draft',
  },
};
