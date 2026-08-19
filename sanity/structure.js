const singleton = (S, type, title) => S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type));

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .child(
          S.list()
            .title('Home')
            .items([
              singleton(S, 'heroSection', 'Slider (cover)'),
              singleton(S, 'tickerSection', 'Ticker (scrolling strip)'),
              singleton(S, 'animationSection', '01 — Animation'),
              singleton(S, 'metodoSection', '02 — Method'),
              singleton(S, 'serviziSection', '03 — Services'),
              singleton(S, 'settoriSection', '04 — Industries'),
              singleton(S, 'numeriSection', '05 — Numbers'),
              singleton(S, 'lavoriSection', '06 — Our Work'),
              singleton(S, 'processoSection', '07 — Process'),
              singleton(S, 'contattiSection', '08 — Contacts'),
              singleton(S, 'seoSettings', 'SEO'),
            ])
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'oKompaniiPage', 'About us'),
              singleton(S, 'pokupatelyamPage', 'For customers'),
              singleton(S, 'bibliotekaPage', 'Library'),
              singleton(S, 'vakansiiPage', 'Careers'),
              singleton(S, 'zayavkaSection', 'Request (form)'),
              singleton(S, 'privacyPage', 'Privacy Policy'),
              singleton(S, 'cookiePage', 'Cookie Policy'),
            ])
        ),
      singleton(S, 'contactFormSettings', 'Contact form — texts'),
      singleton(S, 'cookieBanner', 'Cookie banner'),
      S.divider(),
      singleton(S, 'navbar', 'Navbar'),
      singleton(S, 'footer', 'Footer'),
      singleton(S, 'others', 'Other'),
    ]);
