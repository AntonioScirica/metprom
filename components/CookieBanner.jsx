'use client';

import { useEffect, useState } from 'react';
import { LangProvider, useLang, pick } from '../lib/lang';

export default function CookieBanner({ data }) {
  return (
    <LangProvider>
      <Inner data={data} />
    </LangProvider>
  );
}

function Inner({ data }) {
  const [lang] = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem('cookie-consent')) setVisible(true);
  }, []);

  if (!visible) return null;

  const text = pick(data?.text, lang) || (lang === 'en'
    ? 'We use essential cookies to run this site. See our cookie policy for details.'
    : 'Мы используем только необходимые cookie для работы сайта. Подробнее — в политике использования cookie.');
  const acceptLabel = pick(data?.acceptLabel, lang) || (lang === 'en' ? 'Accept' : 'Принять');
  const declineLabel = pick(data?.declineLabel, lang) || (lang === 'en' ? 'Decline' : 'Отклонить');
  const policyLinkLabel = pick(data?.policyLinkLabel, lang) || (lang === 'en' ? 'Cookie policy' : 'Политика cookie');

  const close = (value) => {
    window.localStorage.setItem('cookie-consent', value);
    setVisible(false);
  };

  return (
    <div className="cookie-banner">
      <p className="mono">{text} <a href="/cookie">{policyLinkLabel}</a></p>
      <div className="cookie-banner-actions">
        <button className="btn" onClick={() => close('accepted')}><span className="dot" />{acceptLabel}</button>
        <button className="cookie-banner-decline" onClick={() => close('declined')}>{declineLabel}</button>
      </div>
    </div>
  );
}
