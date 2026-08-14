'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LangDot from '../../components/LangDot';
import ContactForm from '../../components/ContactForm';
import { LangProvider, useLang, pick } from '../../lib/lang';

const TITLE_FALLBACK = { ru: 'Запросить смету', en: 'Request a quote' };
const LEAD_FALLBACK = {
  ru: 'Расскажите о задаче — идея, чертёж или деталь для замены. Ответим в ближайшее время.',
  en: 'Tell us about the task — an idea, a drawing, or a part to replace. We reply promptly.',
};

export default function ZayavkaClient({ nav, footer, page, formSettings }) {
  return (
    <LangProvider>
      <Inner nav={nav} footer={footer} page={page} formSettings={formSettings} />
    </LangProvider>
  );
}

function Inner({ nav, footer, page, formSettings }) {
  const [lang] = useLang();
  const title = pick(page?.pageTitle, lang) || TITLE_FALLBACK[lang] || TITLE_FALLBACK.ru;
  const lead = pick(page?.pageLead, lang) || LEAD_FALLBACK[lang] || LEAD_FALLBACK.ru;

  return (
    <div>
      <div className="grid-bg" />
      <Header nav={nav} />

      <section className="sec" style={{ paddingTop: 150 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="sec-head" style={{ justifyContent: 'center' }}><span className="mono">{title}</span></div>
          <h1 className="h2">{title}</h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: '60ch', marginLeft: 'auto', marginRight: 'auto' }}>{lead}</p>
          <div style={{ marginTop: 48, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <ContactForm settings={formSettings} />
          </div>
        </div>
      </section>

      <Footer footer={footer} />
      <LangDot />
    </div>
  );
}
