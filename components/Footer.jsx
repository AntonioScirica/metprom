'use client';

import { useLang, pick } from '../lib/lang';

const DEFAULT_SITE_LINKS = [
  { label: { ru: 'Метод', en: 'Method', it: 'Metodo' }, href: '/#metodo' },
  { label: { ru: 'Услуги', en: 'Services', it: 'Servizi' }, href: '/#servizi' },
  { label: { ru: 'Отрасли', en: 'Industries', it: 'Settori' }, href: '/#settori' },
  { label: { ru: 'Работы', en: 'Work', it: 'Lavori' }, href: '/#lavori' },
];

const DEFAULT_INFO_LINKS = [
  { label: { ru: 'О компании', en: 'About us', it: 'Chi siamo' }, href: '/o-kompanii' },
  { label: { ru: 'Покупателям', en: 'For customers', it: 'Per i clienti' }, href: '/pokupatelyam' },
  { label: { ru: 'Библиотека', en: 'Library', it: 'Libreria' }, href: '/biblioteka' },
  { label: { ru: 'Вакансии', en: 'Careers', it: 'Lavora con noi' }, href: '/vakansii' },
];

export default function Footer({ footer }) {
  const [lang] = useLang();

  const description = pick(footer?.description, lang) || 'Проектирование и производство машин и промышленных комплектующих на заказ.';
  const siteLinks = footer?.siteLinks?.length ? footer.siteLinks : DEFAULT_SITE_LINKS;
  const infoLinks = footer?.infoLinks?.length ? footer.infoLinks : DEFAULT_INFO_LINKS;
  const copyright = footer?.copyright || '© 2026 Met Prom Group';
  const legalText = pick(footer?.legalText, lang) || 'Конфиденциальность · Cookie';

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}><span className="mk" />MET&nbsp;PROM&nbsp;GROUP</div>
            <p className="mono" style={{ maxWidth: '30ch', lineHeight: 1.9 }}>{description}</p>
          </div>
          <nav><span className="mono" style={{ marginBottom: 6 }}>Сайт</span>{siteLinks.map((l) => <a key={l.href} href={l.href}>{pick(l.label, lang)}</a>)}</nav>
          <nav><span className="mono" style={{ marginBottom: 6 }}>Информация</span>{infoLinks.map((l) => <a key={l.href} href={l.href}>{pick(l.label, lang)}</a>)}</nav>
        </div>
        <div className="foot-b"><span className="mono">{copyright}</span><span className="mono">{legalText}</span></div>
      </div>
    </footer>
  );
}
