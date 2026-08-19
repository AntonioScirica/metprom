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
  zayavkaSection: {href: '/zayavka', title: 'Request form'},
  contactFormSettings: {href: '/zayavka', title: 'Request form'},
  cookieBanner: {href: '/', title: 'Cookie banner'},
};

export const resolve = {
  locations: (params, {document}) => {
    const type = document?._type;
    if (INFO_ROUTES[type]) {
      return {locations: [{title: document.title?.ru || type, href: INFO_ROUTES[type]}]};
    }
    if (HOME_TYPES.has(type)) {
      return {locations: [{title: 'Home', href: '/'}]};
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
