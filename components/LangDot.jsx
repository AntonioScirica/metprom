'use client';

import { useLang } from '../lib/lang';

const LANGS = ['ru', 'en'];

export default function LangDot() {
  const [lang, setLang] = useLang();

  const next = () => {
    const i = LANGS.indexOf(lang);
    setLang(LANGS[(i + 1) % LANGS.length]);
  };

  return (
    <button className="lang-dot" onClick={next} aria-label="Cambia lingua">
      {lang.toUpperCase()}
    </button>
  );
}
