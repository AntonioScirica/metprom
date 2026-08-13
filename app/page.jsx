'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Blueprint from '../components/Blueprint';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const SERVICES = [
  { n: '01', t: 'Оборудование на заказ', d: 'Проектирование и изготовление специализированных машин для сельского хозяйства и пищевой промышленности. Отталкиваемся от вашей задачи, технического чертежа или физического образца.', ph: 'готовая машина · 4:3', src: '/img/servizio-attrezzature.jpg' },
  { n: '02', t: 'Запчасти и комплектующие', d: 'Шестерни, валы, шкивы, ролики и запасные части для сельского хозяйства, пищевой и тяжёлой промышленности — в том числе для снятого с производства оборудования.', ph: 'шестерни · 4:3', src: '/img/servizio-ricambi.jpg' },
  { n: '03', t: 'Литьё и ковка', d: 'Литьё чёрных и цветных металлов, ковка и производство поковок для конструкционных и механических деталей по спецификации.', ph: 'литьё / отливка · 4:3', src: '/img/servizio-fusione.jpg' },
  { n: '04', t: 'Полимеры и техническая резина', d: 'Обработка пластика, фторопласта, капролона, технолита и технической резины для промышленных деталей, подверженных износу.', ph: 'детали из полимера · 4:3', src: '/img/servizio-polimeri.jpg' },
];

const WORKS = [
  ['Червячная шестерня', '/img/ingranaggio-vite.jpg'],
  ['Конические валы', '/img/alberi-conici.jpg'],
  ['Ёмкость под давлением', '/img/serbatoio-pressione.jpg'],
  ['Резиновые ролики', '/img/rulli-gommati.jpg'],
  ['Крыльчатки', '/img/giranti.jpg'],
  ['Зубчатый диск', '/img/disco-dentato.jpg'],
  ['Машина MPG-T2', null],
  ['Комплектующие на заказ', null],
];

const STEPS = [
  ['01', 'Заявка', 'Расскажите нам о задаче: идея, чертёж или сломанная деталь, которую нужно заменить.'],
  ['02', 'Проектирование', 'Техническая документация под заказ — наша или на основе вашей.'],
  ['03', 'Производство', 'Изготовление в цехе или поставка от проверенных поставщиков.'],
  ['04', 'Испытание', 'Контроль размеров и функциональности перед отправкой.'],
  ['05', 'Доставка', 'Установка, ввод в эксплуатацию и послепродажное обслуживание.'],
];

export default function Page() {
  const [open, setOpen] = useState(0);
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* hero: righe del titolo */
      gsap.to('.line > span', { y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 });

      /* reveal generici */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* griglie a cascata */
      gsap.utils.toArray('.stg').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0, y: 24, duration: 0.85, ease: 'power2.out', stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* contatori */
      gsap.utils.toArray('.ct').forEach((el) => {
        const target = +el.dataset.t;
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 1.6, ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
          onUpdate: () => { el.textContent = Math.round(o.v); },
        });
      });

      /* linea del processo */
      gsap.utils.toArray('.step').forEach((el, i) => {
        gsap.fromTo(el.querySelector('.rule-line'), { width: '0%' }, {
          width: '100%', duration: 0.7, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: '.proc', start: 'top 80%' },
        });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope}>
      <div className="grid-bg" />

      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <h1 className="display">
              <span className="line"><span>От чертежа</span></span>
              <span className="line"><span>к готовой</span></span>
              <span className="line"><span>машине.</span></span>
            </h1>
            <div className="hero-meta">
              <span className="mono">Донецк · Осн. —</span>
              <span className="mono">Проектирование · Производство</span>
              <span className="mono mono-a">Сельское хоз-во / Пищевая пром. / Тяжёлая пром.</span>
            </div>
          </div>
          <div className="hero-sub">
            <p className="lead">Принесите чертёж, образец или просто опишите задачу. Мы спроектируем, изготовим и поставим машину. То, что не производим сами — закупим у проверенных поставщиков.</p>
            <div className="hero-cta">
              <a className="btn" href="#contatti"><span className="dot" />Запросить смету</a>
              <a className="btn ghost" href="#metodo">Как мы работаем</a>
            </div>
          </div>
          <div className="rv">
            <video className="hero-media" src="/video/hero-loop.mp4" autoPlay loop muted playsInline />
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="tick-track">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: 'flex', gap: 44 }}>
              <span>Оборудование на заказ</span><span>Запчасти и комплектующие</span>
              <span>Литьё и ковка</span><span>Полимеры и техническая резина</span>
            </span>
          ))}
        </div>
      </div>

      {/* SEZIONE PINNATA */}
      <Blueprint />

      {/* CLAIM */}
      <section className="sec sec-tight-b">
        <div className="wrap">
          <div className="sec-head"><span className="mono">02 — Метод</span><span className="mono">Рис. 01 → MPG-T2</span></div>
          <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'start' }}>
            <h2 className="h2">То, что существует только на бумаге, мы запускаем в производство.</h2>
            <p className="lead" style={{ marginLeft: 'auto', textAlign: 'right' }}>Один партнёр от чертежа до поставки: проектирование, изготовление в цехе или закупка, испытания и монтаж. Клиент общается с нами, а не с пятью разными поставщиками.</p>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="sec sec-tight-t" id="servizi">
        <div className="wrap">
          <div className="sec-head"><span className="mono">03 — Что мы делаем</span><span className="mono">04 направления</span></div>
          <div className="svc">
            {SERVICES.map((s, i) => (
              <div key={s.n} className={`svc-row${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="svc-head"><span className="mono">{s.n}</span><h3>{s.t}</h3><span className="plus" /></div>
                <div className="svc-body">
                  <div className="svc-inner">
                    <span />
                    <p>{s.d}</p>
                    <Ph label="Фото" spec={s.ph} src={s.src} />
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
          <div className="sec-head"><span className="mono">04 — Отрасли</span><span className="mono">03 отрасли</span></div>
          <div className="sect-grid stg">
            {[
              ['Сельское хозяйство и животноводство', 'Фото — сельское хозяйство', '3:4 · животноводческий комплекс', '01', '/img/settore-agricoltura.jpg'],
              ['Пищевая промышленность', 'Фото — пищевая пром.', '3:4 · производственная линия', '02', '/img/settore-alimentare.jpg'],
              ['Тяжёлая промышленность', 'Фото — тяжёлая пром.', '3:4 · промышленный объект', '03', '/img/settore-pesante.jpg'],
            ].map(([t, l, s, n, src]) => (
              <div className="sect-card" key={n}>
                <Ph label={l} spec={s} src={src} />
                <div className="cap"><h4>{t}</h4><span className="mono">{n}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="mono">05 — Цифры</span><span className="mono mono-a">данные уточняются</span></div>
          <div className="stats stg">
            {[[30, '+', 'Лет работы'], [500, '+', 'Изготовленных деталей'], [3, '', 'Обслуживаемых отраслей'], [100, '%', 'Под заказ']].map(([v, suf, lab]) => (
              <div className="stat" key={lab}>
                <div className="n"><span className="ct" data-t={v}>0</span>{suf && <em>{suf}</em>}</div>
                <div className="l mono">{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAVORI */}
      <section className="sec" id="lavori">
        <div className="wrap">
          <div className="sec-head"><span className="mono">06 — Наши работы</span><span className="mono">08 / —</span></div>
          <div className="pf stg">
            {WORKS.map(([w, src], i) => (
              <div className="item" key={w}>
                <Ph label={`Фото ${String(i + 1).padStart(2, '0')}`} spec="1:1" src={src} />
                <div className="cap"><span className="mono">{w}</span><span className="mono">{String(i + 1).padStart(2, '0')}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec" id="processo">
        <div className="wrap">
          <div className="sec-head"><span className="mono">07 — Процесс</span><span className="mono">05 этапов</span></div>
          <div className="proc">
            {STEPS.map(([n, t, d]) => (
              <div className="step" key={n}>
                <span className="rule-line" style={{ position: 'absolute', top: -1, left: 0, height: 1, background: 'var(--accent)', width: 0 }} />
                <span className="n">{n}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec sec-flush-b" id="contatti">
        <div className="wrap">
          <div className="cta rv">
            <span className="mono">08 — Контакты</span>
            <h2 className="h2" style={{ marginTop: 22 }}>Нужно изготовить деталь или спроектировать машину?</h2>
            <div className="cta-row">
              <a className="btn" href="#"><span className="dot" />Запросить смету</a>
              <div className="cta-contacts">
                <span>Тел — +38 (071) 109-9-009</span>
                <span>WhatsApp — +38 (071) 309-9-009</span>
                <span>Email — info@metpromgroup.ru</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
