const singleton = (S, type, title) => S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type));

export const structure = (S) =>
  S.list()
    .title('Контент')
    .items([
      S.listItem()
        .title('Главная')
        .child(
          S.list()
            .title('Главная')
            .items([
              singleton(S, 'heroSection', 'Слайдер (обложка)'),
              singleton(S, 'tickerSection', 'Бегущая строка'),
              singleton(S, 'animationSection', '01 — Анимация'),
              singleton(S, 'metodoSection', '02 — Метод'),
              singleton(S, 'serviziSection', '03 — Услуги'),
              singleton(S, 'settoriSection', '04 — Отрасли'),
              singleton(S, 'numeriSection', '05 — Цифры'),
              singleton(S, 'lavoriSection', '06 — Наши работы'),
              singleton(S, 'processoSection', '07 — Процесс'),
              singleton(S, 'contattiSection', '08 — Контакты'),
              singleton(S, 'seoSettings', 'SEO'),
            ])
        ),
      S.listItem()
        .title('Страницы')
        .child(
          S.list()
            .title('Страницы')
            .items([
              singleton(S, 'oKompaniiPage', 'О компании'),
              singleton(S, 'pokupatelyamPage', 'Покупателям'),
              singleton(S, 'bibliotekaPage', 'Библиотека'),
              singleton(S, 'vakansiiPage', 'Вакансии'),
              singleton(S, 'zayavkaSection', 'Заявка (форма)'),
              singleton(S, 'privacyPage', 'Политика конфиденциальности'),
              singleton(S, 'cookiePage', 'Политика cookie'),
            ])
        ),
      singleton(S, 'contactFormSettings', 'Форма обратной связи — тексты'),
      singleton(S, 'cookieBanner', 'Плашка cookie'),
      S.divider(),
      singleton(S, 'navbar', 'Навбар'),
      singleton(S, 'footer', 'Подвал'),
      singleton(S, 'others', 'Прочее'),
    ]);
