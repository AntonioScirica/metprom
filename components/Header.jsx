'use client';

import { useEffect, useState } from 'react';
import { useLang, pick } from '../lib/lang';

const DEFAULT_LINKS = [
  { label: { ru: 'Метод', en: 'Method', it: 'Metodo' }, href: '/#metodo' },
  { label: { ru: 'Услуги', en: 'Services', it: 'Servizi' }, href: '/#servizi' },
  { label: { ru: 'Отрасли', en: 'Industries', it: 'Settori' }, href: '/#settori' },
  { label: { ru: 'Работы', en: 'Work', it: 'Lavori' }, href: '/#lavori' },
  { label: { ru: 'Контакты', en: 'Contacts', it: 'Contatti' }, href: '/#contatti' },
];

const DEFAULT_INFO_LINKS = [
  { label: { ru: 'О компании', en: 'About us', it: 'Chi siamo' }, href: '/o-kompanii' },
  { label: { ru: 'Покупателям', en: 'For customers', it: 'Per i clienti' }, href: '/pokupatelyam' },
  { label: { ru: 'Библиотека', en: 'Library', it: 'Libreria' }, href: '/biblioteka' },
  { label: { ru: 'Вакансии', en: 'Careers', it: 'Lavora con noi' }, href: '/vakansii' },
];

export default function Header({ nav }) {
  const [lang] = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hd = document.getElementById('hd');
    const onScroll = () => hd && hd.classList.toggle('on', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  const links = nav?.links?.length ? nav.links : DEFAULT_LINKS;
  const infoLinks = nav?.infoDropdownLinks?.length ? nav.infoDropdownLinks : DEFAULT_INFO_LINKS;
  const infoLabel = pick(nav?.infoDropdownLabel, lang) || 'Информация';
  const ctaLabel = pick(nav?.ctaLabel, lang) || 'Смета';
  const ctaHref = nav?.ctaHref || '/zayavka';

  const contattiIdx = links.findIndex((l) => l.href?.includes('contatti'));
  const before = contattiIdx >= 0 ? links.slice(0, contattiIdx) : links;
  const after = contattiIdx >= 0 ? links.slice(contattiIdx) : [];

  return (
    <header id="hd">
      <div className="wrap">
        <div className="brand"><span className="mk" />РИММАКС</div>
        <nav>
          {before.map((l) => <a key={l.href} href={l.href}>{pick(l.label, lang)}</a>)}
          <div className="nav-drop">
            <a href="#">{infoLabel}</a>
            <div className="nav-drop-menu">
              {infoLinks.map((l) => <a key={l.href} href={l.href}>{pick(l.label, lang)}</a>)}
            </div>
          </div>
          {after.map((l) => <a key={l.href} href={l.href}>{pick(l.label, lang)}</a>)}
        </nav>
        <div className="hgroup">
          <a className="btn" href={ctaHref}><span className="dot" />{ctaLabel}</a>
          <button className={`burger${open ? ' on' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="mnav">
        {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{pick(l.label, lang)}</a>)}
        <span className="mnav-sep">{infoLabel}</span>
        {infoLinks.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{pick(l.label, lang)}</a>)}
        <a className="btn mnav-cta" href={ctaHref} onClick={() => setOpen(false)}><span className="dot" />{ctaLabel}</a>
      </div>
    </header>
  );
}
