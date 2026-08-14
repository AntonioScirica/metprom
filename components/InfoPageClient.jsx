'use client';

import Header from './Header';
import Footer from './Footer';
import LangDot from './LangDot';
import { LangProvider, useLang, pick } from '../lib/lang';

export default function InfoPageClient({ page, nav, footer, fallbackTitle }) {
  return (
    <LangProvider>
      <Inner page={page} nav={nav} footer={footer} fallbackTitle={fallbackTitle} />
    </LangProvider>
  );
}

function Inner({ page, nav, footer, fallbackTitle }) {
  const [lang] = useLang();
  const title = pick(page?.title, lang) || fallbackTitle;

  return (
    <div>
      <div className="grid-bg" />
      <Header nav={nav} />

      <section className="sec" style={{ paddingTop: 150 }}>
        <div className="wrap">
          <div className="sec-head"><span className="mono">01 — Информация</span><span className="mono">{title}</span></div>
          <h1 className="h2">{title}</h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: '60ch' }}>{pick(page?.text, lang)}</p>
        </div>
      </section>

      <Footer footer={footer} />
      <LangDot />
    </div>
  );
}
