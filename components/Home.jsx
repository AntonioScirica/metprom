'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Blueprint from './Blueprint';
import Header from './Header';
import Footer from './Footer';
import LangDot from './LangDot';
import { LangProvider, useLang, pick } from '../lib/lang';

gsap.registerPlugin(ScrollTrigger);

function Ph({ label, spec, className = '', src }) {
  if (src) {
    return (
      <div className={`ph ph-img ${className}`}>
        <img src={src} alt={label} />
        <span className="tick t1" /><span className="tick t2" />
        <span className="tick t3" /><span className="tick t4" />
      </div>
    );
  }
  return (
    <div className={`ph ${className}`}>
      <span className="tick t1" /><span className="tick t2" />
      <span className="tick t3" /><span className="tick t4" />
      <b>{label}</b>
      <i>{spec}</i>
    </div>
  );
}

export default function Home({ home, animation, nav, footer }) {
  return (
    <LangProvider>
      <HomeInner home={home} animation={animation} nav={nav} footer={footer} />
    </LangProvider>
  );
}

function HomeInner({ home, animation, nav, footer }) {
  const [lang] = useLang();
  const [open, setOpen] = useState(0);
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.line > span', { y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 });

      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      gsap.utils.toArray('.stg').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0, y: 24, duration: 0.85, ease: 'power2.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      gsap.utils.toArray('.ct').forEach((el) => {
        const target = +el.dataset.t;
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 1.6, ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
          onUpdate: () => { el.textContent = Math.round(o.v); },
        });
      });

      gsap.utils.toArray('.step').forEach((el, i) => {
        gsap.fromTo(el.querySelector('.rule-line'), { width: '0%' }, {
          width: '100%', duration: 0.7, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: '.proc', start: 'top 80%' },
        });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const h = home || {};
  const servizi = h.servizi || [];
  const settori = h.settori || [];
  const lavori = h.lavori || [];
  const processo = h.processo || [];
  const numeri = h.numeri || [];
  const t = (field, fallback) => pick(field, lang) || fallback;

  return (
    <div ref={scope}>
      <div className="grid-bg" />

      <Header nav={nav} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <h1 className="display">
              <span className="line"><span>{t(h.heroTitleLine1, 'От чертежа')}</span></span>
              <span className="line"><span>{t(h.heroTitleLine2, 'к готовой')}</span></span>
              <span className="line"><span>{t(h.heroTitleLine3, 'машине.')}</span></span>
            </h1>
            <div className="hero-meta">
              <span className="hero-meta-row">
                <span className="mono">{t(h.heroLocation, 'Донецк · Осн. —')}</span>
                <span className="mono">{t(h.heroTagline, 'Проектирование · Производство')}</span>
              </span>
              <span className="mono mono-a">{t(h.heroTags, 'Сельское хоз-во / Пищевая пром. / Тяжёлая пром.')}</span>
            </div>
          </div>
          <div className="hero-sub">
            <p className="lead">{t(h.heroLead, 'Принесите чертёж, образец или просто опишите задачу. Мы спроектируем, изготовим и поставим машину. То, что не производим сами — закупим у проверенных поставщиков.')}</p>
            <div className="hero-cta">
              <a className="btn" href="/zayavka"><span className="dot" />{t(h.ctaPrimaryLabel, 'Запросить смету')}</a>
              <a className="btn ghost" href="#metodo">{t(h.ctaSecondaryLabel, 'Как мы работаем')}</a>
            </div>
          </div>
          <div className="rv">
            <video className="hero-media" src={h.heroVideoUrl || '/video/hero-loop.mp4'} autoPlay loop muted playsInline />
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="tick-track">
          {(() => {
            const items = h.tickerItems?.length ? h.tickerItems : (servizi.length ? servizi : [{ title: 'Оборудование на заказ' }, { title: 'Запчасти и комплектующие' }, { title: 'Литьё и ковка' }, { title: 'Полимеры и техническая резина' }]);
            return [...items, ...items].map((s, i) => <span key={`${s._key || s.title}-${i}`}>{t(s.title || s, s.title || s)}</span>);
          })()}
        </div>
      </div>

      {/* SEZIONE PINNATA */}
      <Blueprint data={animation} />

      {/* CLAIM */}
      <section className="sec sec-tight-b">
        <div className="wrap">
          <div className="sec-head"><span className="mono">{t(h.metodoEyebrow, '02 — Метод')}</span><span className="mono">{t(h.metodoFigure, 'Рис. 01 → MPG-T2')}</span></div>
          <div className="rv claim-grid">
            <h2 className="h2">{t(h.claimTitle, 'То, что существует только на бумаге, мы запускаем в производство.')}</h2>
            <p className="lead claim-text">{t(h.claimText, 'Один партнёр от чертежа до поставки: проектирование, изготовление в цехе или закупка, испытания и монтаж. Клиент общается с нами, а не с пятью разными поставщиками.')}</p>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="sec sec-tight-t" id="servizi">
        <div className="wrap">
          <div className="sec-head"><span className="mono">{t(h.serviziEyebrow, '03 — Что мы делаем')}</span><span className="mono">{String(servizi.length).padStart(2, '0')} {t(h.serviziCountLabel, 'направления')}</span></div>
          <div className="svc">
            {servizi.map((s, i) => (
              <div key={s._key} className={`svc-row${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="svc-head"><span className="mono">{s.order}</span><h3>{pick(s.title, lang)}</h3><span className="plus" /></div>
                <div className="svc-body">
                  <div className="svc-inner">
                    <span />
                    <p>{pick(s.description, lang)}</p>
                    <Ph label="Фото" spec="" src={s.photoUrl} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SETTORI */}
      <section className="sec" id="settori">
        <div className="wrap">
          <div className="sec-head"><span className="mono">{t(h.settoriEyebrow, '04 — Отрасли')}</span><span className="mono">{String(settori.length).padStart(2, '0')} {t(h.settoriCountLabel, 'отрасли')}</span></div>
          <div className="sect-grid stg">
            {settori.map((s) => (
              <div className="sect-card" key={s._key}>
                {s.videoUrl ? (
                  <div className="ph ph-img">
                    <video src={s.videoUrl} autoPlay loop muted playsInline />
                    <span className="tick t1" /><span className="tick t2" />
                    <span className="tick t3" /><span className="tick t4" />
                  </div>
                ) : (
                  <Ph label={pick(s.title, lang)} spec="" src={s.photoUrl} />
                )}
                <div className="cap"><h4>{pick(s.title, lang)}</h4><span className="mono">{s.order}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="mono">{t(h.numeriEyebrow, '05 — Цифры')}</span><span className="mono mono-a">{t(h.numeriNote, 'данные уточняются')}</span></div>
          <div className="stats stg">
            {numeri.map((st) => (
              <div className="stat" key={st._key}>
                <div className="n"><span className="ct" data-t={st.value}>0</span>{st.suffix && <em>{st.suffix}</em>}</div>
                <div className="l mono">{pick(st.label, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAVORI */}
      <section className="sec" id="lavori">
        <div className="wrap">
          <div className="sec-head"><span className="mono">{t(h.lavoriEyebrow, '06 — Наши работы')}</span><span className="mono">{String(lavori.length).padStart(2, '0')} / —</span></div>
          <div className="pf stg">
            {lavori.map((w, i) => (
              <div className="item" key={w._key}>
                <Ph label={`Фото ${String(i + 1).padStart(2, '0')}`} spec="1:1" src={w.photoUrl} />
                <div className="cap"><span className="mono">{pick(w.title, lang)}</span><span className="mono">{String(i + 1).padStart(2, '0')}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec" id="processo">
        <div className="wrap">
          <div className="sec-head sec-head-flush-t sec-head-close"><span className="mono">{t(h.processoEyebrow, '07 — Процесс')}</span><span className="mono">{String(processo.length).padStart(2, '0')} {t(h.processoCountLabel, 'этапов')}</span></div>
          <div className="proc">
            {processo.map((st) => (
              <div className="step" key={st._key}>
                <span className="rule-line" style={{ position: 'absolute', top: -1, left: 0, height: 1, background: 'var(--accent)', width: 0 }} />
                <span className="n">{st.order}</span>
                <h4>{pick(st.title, lang)}</h4>
                <p>{pick(st.text, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec sec-flush-b" id="contatti">
        <div className="cta rv">
          <div className="wrap">
            <span className="mono">{t(h.contattiEyebrow, '08 — Контакты')}</span>
            <h2 className="h2" style={{ marginTop: 22 }}>{t(h.ctaTitle, 'Нужно изготовить деталь или спроектировать машину?')}</h2>
            <div className="cta-row">
              <a className="btn" href="/zayavka"><span className="dot" />{t(h.ctaPrimaryLabel, 'Запросить смету')}</a>
              <div className="cta-contacts">
                <span>Тел — {h.phone || '+38 (071) 109-9-009'}</span>
                <span>WhatsApp — {h.whatsapp || '+38 (071) 309-9-009'}</span>
                <span>Email — {h.email || 'info@metpromgroup.ru'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer footer={footer} />
      <LangDot />
    </div>
  );
}
