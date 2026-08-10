'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Blueprint from '../components/Blueprint';

gsap.registerPlugin(ScrollTrigger);

function Ph({ label, spec, className = '' }) {
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
  { n: '01', t: 'Attrezzature su misura', d: 'Progettazione e costruzione di macchine dedicate per il settore agricolo e alimentare. Partiamo dalla tua esigenza, dal tuo disegno tecnico o da un campione fisico.', ph: 'macchina finita · 4:3' },
  { n: '02', t: 'Ricambi & componenti', d: 'Ingranaggi, alberi, pignoni, rulli e componenti di ricambio per agricoltura, alimentare e industria pesante — anche per macchinari fuori produzione.', ph: 'ingranaggi · 4:3' },
  { n: '03', t: 'Fusione & forgiatura', d: 'Fusione di metalli ferrosi e non ferrosi, forgiatura e produzione di forgiati per componenti strutturali e meccanici su specifica.', ph: 'fusione / colata · 4:3' },
  { n: '04', t: 'Polimeri & gomma tecnica', d: 'Lavorazione di plastica, fluoroplastica, caprolon, tecnolite e gomma tecnica per componenti industriali soggetti a usura.', ph: 'pezzi in polimero · 4:3' },
];

const WORKS = ['Ingranaggio a vite', 'Alberi conici', 'Serbatoio in pressione', 'Rulli gommati', 'Giranti', 'Disco dentato', 'Macchina MPG-T2', 'Componenti custom'];

const STEPS = [
  ['01', 'Richiesta', "Ci racconti l'esigenza: un'idea, un disegno o un pezzo rotto da sostituire."],
  ['02', 'Progettazione', 'Documentazione tecnica su misura, nostra o basata sulla tua.'],
  ['03', 'Produzione', 'Costruzione in officina oppure procurement da fornitori selezionati.'],
  ['04', 'Collaudo', 'Controllo dimensionale e funzionale prima della spedizione.'],
  ['05', 'Consegna', 'Installazione, messa in servizio e assistenza post-vendita.'],
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

  useEffect(() => {
    const hd = document.getElementById('hd');
    const onScroll = () => hd && hd.classList.toggle('on', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scope}>
      <div className="grid-bg" />

      <header id="hd">
        <div className="wrap">
          <div className="brand"><span className="mk" />MET&nbsp;PROM&nbsp;GROUP</div>
          <nav>
            <a href="#metodo">Metodo</a><a href="#servizi">Servizi</a>
            <a href="#settori">Settori</a><a href="#lavori">Lavori</a><a href="#contatti">Contatti</a>
          </nav>
          <div className="hgroup">
            {/* Area clienti — nascosta temporaneamente */}
            <a className="btn" href="#contatti"><span className="dot" />Preventivo</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <h1 className="display">
              <span className="line"><span>Dal foglio</span></span>
              <span className="line"><span>tecnico alla</span></span>
              <span className="line"><span>macchina.</span></span>
            </h1>
            <div className="hero-meta">
              <span className="mono">Donetsk · Est. —</span>
              <span className="mono">Progettazione · Produzione</span>
              <span className="mono mono-a">Agricoltura / Alimentare / Pesante</span>
            </div>
          </div>
          <div className="hero-sub">
            <p className="lead">Ci porti un disegno, un campione o solo un'esigenza. Noi progettiamo, costruiamo e consegniamo la macchina. Quello che non produciamo, lo procuriamo.</p>
            <div className="hero-cta">
              <a className="btn" href="#contatti"><span className="dot" />Richiedi un preventivo</a>
              <a className="btn ghost" href="#metodo">Come lavoriamo</a>
            </div>
          </div>
          <div className="rv">
            <Ph className="hero-media" label="Video — hero" spec="16:9 · officina in lavorazione · loop muto · 1920×1080" />
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="tick-track">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: 'flex', gap: 44 }}>
              <span>Attrezzature su misura</span><span>Ricambi &amp; componenti</span>
              <span>Fusione &amp; forgiatura</span><span>Polimeri &amp; gomma tecnica</span>
            </span>
          ))}
        </div>
      </div>

      {/* SEZIONE PINNATA */}
      <Blueprint />

      {/* CLAIM */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="mono">02 — Metodo</span><span className="mono">Fig. 01 → MPG-T2</span></div>
          <div className="rv" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'start' }}>
            <h2 className="h2">Quello che esiste solo su carta, noi lo mettiamo in produzione.</h2>
            <p className="lead">Un solo interlocutore dal disegno tecnico alla consegna: progettazione, costruzione in officina o procurement, collaudo e installazione. Il cliente parla con noi, non con cinque fornitori diversi.</p>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="sec" id="servizi">
        <div className="wrap">
          <div className="sec-head"><span className="mono">03 — Cosa facciamo</span><span className="mono">04 aree</span></div>
          <div className="svc">
            {SERVICES.map((s, i) => (
              <div key={s.n} className={`svc-row${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="svc-head"><span className="mono">{s.n}</span><h3>{s.t}</h3><span className="plus" /></div>
                <div className="svc-body">
                  <div className="svc-inner">
                    <span />
                    <p>{s.d}</p>
                    <Ph label="Foto" spec={s.ph} />
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
          <div className="sec-head"><span className="mono">04 — Settori</span><span className="mono">03 industrie</span></div>
          <div className="sect-grid stg">
            {[
              ['Agricoltura & zootecnia', 'Foto — agricoltura', '3:4 · impianto zootecnico', '01'],
              ['Industria alimentare', 'Foto — alimentare', '3:4 · linea di lavorazione', '02'],
              ['Industria pesante', 'Foto — pesante', '3:4 · impianto industriale', '03'],
            ].map(([t, l, s, n]) => (
              <div className="sect-card" key={n}>
                <Ph label={l} spec={s} />
                <div className="cap"><h4>{t}</h4><span className="mono">{n}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="mono">05 — Numeri</span><span className="mono mono-a">dati da confermare</span></div>
          <div className="stats stg">
            {[[30, '+', 'Anni di attività'], [500, '+', 'Pezzi realizzati'], [3, '', 'Settori serviti'], [100, '%', 'Su misura']].map(([v, suf, lab]) => (
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
          <div className="sec-head"><span className="mono">06 — I nostri lavori</span><span className="mono">08 / —</span></div>
          <div className="pf stg">
            {WORKS.map((w, i) => (
              <div className="item" key={w}>
                <Ph label={`Foto ${String(i + 1).padStart(2, '0')}`} spec="1:1" />
                <div className="cap"><span className="mono">{w}</span><span className="mono">{String(i + 1).padStart(2, '0')}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec" id="processo">
        <div className="wrap">
          <div className="sec-head"><span className="mono">07 — Processo</span><span className="mono">05 fasi</span></div>
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
      <section className="sec" id="contatti">
        <div className="wrap">
          <div className="cta rv">
            <span className="mono">08 — Contatti</span>
            <h2 className="h2" style={{ marginTop: 22 }}>Hai un pezzo da rifare o una macchina da progettare?</h2>
            <div className="cta-row">
              <a className="btn" href="#"><span className="dot" />Richiedi un preventivo</a>
              <div className="cta-contacts">
                <span>T — +38 (071) 109-9-009</span>
                <span>W — +38 (071) 309-9-009</span>
                <span>E — info@metpromgroup.ru</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <div className="brand" style={{ marginBottom: 14 }}><span className="mk" />MET&nbsp;PROM&nbsp;GROUP</div>
              <p className="mono" style={{ maxWidth: '30ch', lineHeight: 1.9 }}>Progettazione e produzione di macchine e componenti industriali su misura.</p>
            </div>
            <nav><span className="mono" style={{ marginBottom: 6 }}>Sito</span><a href="#metodo">Metodo</a><a href="#servizi">Servizi</a><a href="#settori">Settori</a><a href="#lavori">Lavori</a></nav>
            <nav><span className="mono" style={{ marginBottom: 6 }}>Contatti</span><a href="#">Telefono</a><a href="#">WhatsApp</a><a href="#">Email</a><a href="#">Area clienti</a></nav>
          </div>
          <div className="foot-b"><span className="mono">© 2026 Met Prom Group</span><span className="mono">Privacy · Cookie</span></div>
        </div>
      </footer>
    </div>
  );
}
