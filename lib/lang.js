'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LangContext = createContext(['ru', () => {}]);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    const saved = window.localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  const set = (l) => {
    setLang(l);
    window.localStorage.setItem('lang', l);
  };

  return <LangContext.Provider value={[lang, set]}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function pick(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.ru || '';
}
