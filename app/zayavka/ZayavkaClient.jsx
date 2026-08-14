'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LangDot from '../../components/LangDot';
import ContactForm from '../../components/ContactForm';
import { LangProvider, useLang } from '../../lib/lang';

const TITLE = { ru: 'Запросить смету', en: 'Request a quote' };
const LEAD = {
  ru: 'Расскажите о задаче — идея, чертёж или деталь для замены. Ответим в ближайшее время.',
  en: 'Tell us about the task — an idea, a drawing, or a part to replace. We reply promptly.',
};

export default function ZayavkaClient({ nav, footer }) {
  return (
    <LangProvider>
      <Inner nav={nav} footer={footer} />
    </LangProvider>
  );
}

function Inner({ nav, footer }) {
  const [lang] = useLang();

  return (
    <div>
      <div className="grid-bg" />
      <Header nav={nav} />

      <section className="sec" style={{ paddingTop: 150 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="sec-head" style={{ justifyContent: 'center' }}><span className="mono">{TITLE[lang] || TITLE.ru}</span></div>
          <h1 className="h2">{TITLE[lang] || TITLE.ru}</h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: '60ch', marginLeft: 'auto', marginRight: 'auto' }}>{LEAD[lang] || LEAD.ru}</p>
          <div style={{ marginTop: 48, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer footer={footer} />
      <LangDot />
    </div>
  );
}
