'use client';

import { useEffect } from 'react';

const INFO_LINKS = [
  ['О компании', '/o-kompanii'],
  ['Покупателям', '/pokupatelyam'],
  ['Библиотека', '/biblioteka'],
  ['Вакансии', '/vakansii'],
];

export default function Header() {
  useEffect(() => {
    const hd = document.getElementById('hd');
    const onScroll = () => hd && hd.classList.toggle('on', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="hd">
      <div className="wrap">
        <div className="brand"><span className="mk" />MET&nbsp;PROM&nbsp;GROUP</div>
        <nav>
          <a href="/#metodo">Метод</a><a href="/#servizi">Услуги</a>
          <a href="/#settori">Отрасли</a><a href="/#lavori">Работы</a>
          <div className="nav-drop">
            <a href="#">Информация</a>
            <div className="nav-drop-menu">
              {INFO_LINKS.map(([t, href]) => <a key={href} href={href}>{t}</a>)}
            </div>
          </div>
          <a href="/#contatti">Контакты</a>
        </nav>
        <div className="hgroup">
          <a className="btn" href="/#contatti"><span className="dot" />Смета</a>
        </div>
      </div>
    </header>
  );
}
