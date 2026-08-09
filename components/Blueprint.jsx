'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  'Geometria',
  'Tracciato',
  'Foglio tecnico',
  'Prende corpo',
  'Macchina pronta',
];

/* tempi (in secondi di timeline) in cui inizia ciascuna fase */
const MARKS = [0, 2.2, 4.6, 6.6, 9.8];

/* offset di "assestamento" per ciascuno dei 10 pezzi */
const SETTLE = [
  { x: 0, y: 26, r: 0 },
  { x: -8, y: 16, r: -1.2 },
  { x: 0, y: -30, r: 0 },
  { x: -34, y: -8, r: -22 },
  { x: 30, y: 12, r: 3 },
  { x: 26, y: -16, r: -26 },
  { x: 36, y: -22, r: 30 },
  { x: 10, y: -30, r: 1.5 },
  { x: 26, y: 24, r: 4 },
  { x: -36, y: 16, r: -3 },
];

export default function Blueprint() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = (s) => root.current.querySelectorAll(s);
      const parts = gsap.utils.toArray(q('.part'));
      const machine = root.current.querySelector('.machine');
      const pctEl = root.current.querySelector('.js-pct');
      const lblEl = root.current.querySelector('.js-lbl');
      const barEl = root.current.querySelector('.js-bar');
      const phaseEls = gsap.utils.toArray(q('.phase'));

      /* il tratto della macchina diventa "tracciabile": ogni forma parte scarica */
      const strokes = [];
      parts.forEach((p) => {
        p.querySelectorAll('.out rect, .out circle, .out line, .out path, circle.out, line.out').forEach((s) => {
          s.setAttribute('pathLength', '1');
          strokes.push(s);
        });
      });
      gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 });

      /* stato iniziale: in scena c'e' solo la geometria di costruzione */
      gsap.set(q('.draw'), { strokeDashoffset: 1 });
      gsap.set(q('.sol'), { opacity: 0 });
      gsap.set('#shadow', { opacity: 0 });
      gsap.set('#annots', { opacity: 0 });
      gsap.set('#sheet', { opacity: 0 });
      gsap.set(q('.led'), { opacity: 0 });
      gsap.set(q('.node'), { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=560%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const t = p * tl.duration();
            if (pctEl) pctEl.textContent = Math.round(p * 100);
            if (barEl) barEl.style.width = p * 100 + '%';
            let i = 0;
            for (let k = MARKS.length - 1; k >= 0; k--) { if (t >= MARKS[k]) { i = k; break; } }
            if (lblEl) lblEl.textContent = PHASES[i];
            phaseEls.forEach((e, j) => e.classList.toggle('on', j === i));
            machine.classList.toggle('run', t > 10.2);
          },
        },
      });

      /* 01 - GEOMETRIA: assi, ingombri, circonferenze di riferimento */
      tl.to(q('#scaffold .draw'), { strokeDashoffset: 0, duration: 1.4, stagger: 0.035, ease: 'none' }, 0)
        .to(q('.node'), { opacity: 1, duration: 0.35, stagger: 0.025, ease: 'none' }, 1.3);

      /* 02 - TRACCIATO: la macchina si disegna sopra la geometria, pezzo per pezzo */
      parts.forEach((p, i) => {
        tl.to(p.querySelectorAll('[pathLength]'), {
          strokeDashoffset: 0, duration: 0.7, stagger: 0.025, ease: 'none',
        }, 2.2 + i * 0.17);
      });

      /* 03 - il foglio si completa: cornice, cartiglio, quote e palloncini */
      tl.to('#sheet', { opacity: 1, duration: 0.5, ease: 'power1.out' }, 3.5)
        .to(q('#sheet .draw'), { strokeDashoffset: 0, duration: 0.9, stagger: 0.06, ease: 'none' }, 3.5)
        .to(q('#annots .draw'), { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, 3.9)
        .to('#annots', { opacity: 1, duration: 0.7, ease: 'power1.out' }, 3.9);

      /* pausa: il foglio tecnico completo resta leggibile */
      tl.to({}, { duration: 1.0 }, 4.8);

      /* 04 - geometria e foglio si ritirano */
      tl.to('#scaffold', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 5.8)
        .to('#annots', { opacity: 0, duration: 0.9, ease: 'power1.inOut' }, 6.0)
        .to('#sheet', { opacity: 0, duration: 0.9, ease: 'power1.inOut' }, 6.2)
        .to('#paper', { opacity: 0, duration: 1.0, ease: 'power1.inOut' }, 6.4);

      /* 05 - ogni pezzo prende materia, in sequenza 01 -> 10 */
      parts.forEach((p, i) => {
        const at = 6.8 + i * 0.3;
        const s = SETTLE[i];
        tl.to(p, { x: s.x, y: s.y, rotation: s.r, duration: 0.45, ease: 'power2.in' }, at);
        tl.to(p, { x: 0, y: 0, rotation: 0, duration: 1.0, ease: 'power3.out' }, at + 0.45);
        tl.to(p.querySelectorAll('.sol'), { opacity: 1, duration: 0.8, ease: 'power1.out' }, at + 0.5);
      });

      /* 06 - finitura e avvio */
      tl.to(q('.led'), { opacity: 1, duration: 0.5, ease: 'power1.out' }, 9.4)
        .to('#shadow', { opacity: 0.13, duration: 1.2, ease: 'power1.out' }, 9.7)
        .to(machine, { scale: 1.015, duration: 1.4, ease: 'power2.out' }, 9.7);

      tl.to({}, { duration: 1.4 }, 10.4);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pin-wrap" id="metodo" ref={root}>
      <div className="pin-stage">
        <div className="stage-bar">
          <span className="ttl">01 — Dal foglio tecnico alla macchina</span>
          <span className="rd">
            <span className="js-pct">0</span>% · <span className="js-lbl">Geometria</span>
            <span className="js-hint" />
          </span>
        </div>

        <div className="stage-svg">
          <svg viewBox="0 0 1000 680">
            {/* FOGLIO */}
            <rect id="paper" x="30" y="24" width="940" height="632" fill="#ffffff" />

            {/* CORNICE + CARTIGLIO */}
            <g id="sheet">
              <rect className="sheet draw" x="30" y="24" width="940" height="632" pathLength="1" />
              <rect className="sheet draw" x="46" y="40" width="908" height="600" pathLength="1" />
              <g>
                <rect className="sheet draw" x="714" y="546" width="240" height="94" pathLength="1" />
                <line className="ann" x1="714" y1="576" x2="954" y2="576" />
                <line className="ann" x1="714" y1="608" x2="954" y2="608" />
                <line className="ann" x1="834" y1="608" x2="834" y2="640" />
                <text className="ann-t" x="724" y="567">MET PROM GROUP</text>
                <text className="ann-t" x="724" y="598">MPG-T2 / GRUPPO PRINCIPALE</text>
                <text className="ann-t" x="724" y="629">SCALA 1:10</text>
                <text className="ann-t" x="844" y="629">REV. 01 · 1/1</text>
              </g>
              <text className="ann-t" x="62" y="66">TOLLERANZE GEN. ISO 2768-mK</text>
              <text className="ann-t" x="62" y="82">MAT. S235JR / AISI 304</text>
              <text className="ann-t" x="62" y="98">SALDATURE EN ISO 5817-C</text>
              <text className="ann-t" x="62" y="114">FINITURA RA 3.2</text>
            </g>

            {/* QUOTE E ANNOTAZIONI */}
            <g id="annots">
              <line className="ann draw" x1="296" y1="612" x2="704" y2="612" pathLength="1" />
              <line className="ann" x1="296" y1="604" x2="296" y2="620" />
              <line className="ann" x1="704" y1="604" x2="704" y2="620" />
              <rect x="470" y="602" width="60" height="18" fill="#ffffff" />
              <text className="ann-t" x="478" y="616">1240 mm</text>

              <line className="ann draw" x1="118" y1="150" x2="118" y2="586" pathLength="1" />
              <line className="ann" x1="110" y1="150" x2="126" y2="150" />
              <line className="ann" x1="110" y1="586" x2="126" y2="586" />
              <rect x="92" y="358" width="52" height="18" fill="#ffffff" />
              <text className="ann-t" x="98" y="372">890 mm</text>

              <line className="ann" x1="330" y1="342" x2="530" y2="342" strokeDasharray="14 4 3 4" />
              <line className="ann" x1="430" y1="242" x2="430" y2="442" strokeDasharray="14 4 3 4" />

              <line className="ann-a" x1="392" y1="304" x2="286" y2="214" />
              <line className="ann-a" x1="286" y1="214" x2="234" y2="214" />
              <text className="ann-at" x="234" y="206">Ø116 H7</text>

              <text className="ann-t" x="820" y="120">SEZ. A–A</text>
              <line className="ann-a" x1="800" y1="130" x2="860" y2="130" />

              <g><line className="ann" x1="163" y1="586" x2="296" y2="576" /><circle className="ann" cx="150" cy="586" r="13" fill="#ffffff" /><text className="balloon-t" x="150" y="586">01</text></g>
              <g><line className="ann" x1="163" y1="300" x2="300" y2="300" /><circle className="ann" cx="150" cy="300" r="13" fill="#ffffff" /><text className="balloon-t" x="150" y="300">02</text></g>
              <g><line className="ann" x1="500" y1="123" x2="510" y2="150" /><circle className="ann" cx="500" cy="110" r="13" fill="#ffffff" /><text className="balloon-t" x="500" y="110">03</text></g>
              <g><line className="ann" x1="243" y1="256" x2="392" y2="330" /><circle className="ann" cx="230" cy="250" r="13" fill="#ffffff" /><text className="balloon-t" x="230" y="250">04</text></g>
              <g><line className="ann" x1="827" y1="330" x2="776" y2="340" /><circle className="ann" cx="840" cy="330" r="13" fill="#ffffff" /><text className="balloon-t" x="840" y="330">05</text></g>
              <g><line className="ann" x1="827" y1="252" x2="740" y2="250" /><circle className="ann" cx="840" cy="252" r="13" fill="#ffffff" /><text className="balloon-t" x="840" y="252">06</text></g>
              <g><line className="ann" x1="853" y1="182" x2="774" y2="204" /><circle className="ann" cx="866" cy="180" r="13" fill="#ffffff" /><text className="balloon-t" x="866" y="180">07</text></g>
              <g><line className="ann" x1="640" y1="222" x2="620" y2="286" /><circle className="ann" cx="646" cy="212" r="13" fill="#ffffff" /><text className="balloon-t" x="646" y="212">08</text></g>
              <g><line className="ann" x1="787" y1="470" x2="732" y2="462" /><circle className="ann" cx="800" cy="472" r="13" fill="#ffffff" /><text className="balloon-t" x="800" y="472">09</text></g>
              <g><line className="ann" x1="163" y1="380" x2="176" y2="380" /><circle className="ann" cx="150" cy="380" r="13" fill="#ffffff" /><text className="balloon-t" x="150" y="380">10</text></g>
            </g>

            {/* GEOMETRIA DI COSTRUZIONE */}
            <g id="scaffold">
              {/* ingombro generale */}
              <rect className="scf draw" x="176" y="150" width="600" height="436" pathLength="1" />

              {/* assi orizzontali */}
              {[150, 252, 342, 432, 566, 586].map((y) => (
                <line key={'h' + y} className="scf draw" x1="120" y1={y} x2="840" y2={y} pathLength="1" />
              ))}

              {/* assi verticali */}
              {[300, 382, 430, 500, 602, 638, 700, 756].map((x) => (
                <line key={'v' + x} className="scf draw" x1={x} y1="110" x2={x} y2="630" pathLength="1" />
              ))}

              {/* circonferenze di riferimento */}
              <circle className="scf draw" cx="430" cy="342" r="56" pathLength="1" />
              <circle className="scf draw" cx="430" cy="342" r="30" pathLength="1" />
              <circle className="scf draw" cx="700" cy="250" r="38" pathLength="1" />
              <circle className="scf draw" cx="756" cy="206" r="22" pathLength="1" />

              {/* generatrici della tramoggia */}
              <line className="scf draw" x1="382" y1="252" x2="418" y2="150" pathLength="1" />
              <line className="scf draw" x1="638" y1="252" x2="602" y2="150" pathLength="1" />
              <line className="scf draw" x1="642" y1="432" x2="732" y2="486" pathLength="1" />

              {/* nodi */}
              {[
                [300, 252], [700, 252], [300, 432], [700, 432], [430, 342],
                [700, 250], [756, 206], [296, 566], [704, 566], [418, 150],
                [602, 150], [176, 380], [302, 380], [642, 432], [732, 486],
              ].map(([cx, cy]) => (
                <circle key={cx + '-' + cy} className="node" cx={cx} cy={cy} r="2.6" />
              ))}
            </g>

            {/* MACCHINA */}
            <g className="machine">
              <ellipse id="shadow" cx="500" cy="600" rx="230" ry="12" fill="#171715" opacity="0" />

              {/* 01 telaio */}
              <g className="part">
                <g className="sol">
                  <rect x="296" y="566" width="408" height="20" fill="#b9b7ae" />
                  <rect x="316" y="430" width="24" height="136" fill="#c9c7bf" />
                  <rect x="660" y="430" width="24" height="136" fill="#c9c7bf" />
                </g>
                <g className="out">
                  <rect x="296" y="566" width="408" height="20" rx="3" />
                  <rect x="316" y="430" width="24" height="136" />
                  <rect x="660" y="430" width="24" height="136" />
                </g>
              </g>

              {/* 02 corpo */}
              <g className="part">
                <g className="sol">
                  <rect x="300" y="252" width="400" height="180" rx="6" fill="#dedcd4" />
                  <rect x="300" y="252" width="400" height="26" fill="#c9c7bf" />
                </g>
                <g className="out">
                  <rect x="300" y="252" width="400" height="180" rx="6" />
                  <line x1="300" y1="278" x2="700" y2="278" />
                </g>
              </g>

              {/* 03 tramoggia */}
              <g className="part">
                <g className="sol"><path d="M382 252 L418 150 L602 150 L638 252 Z" fill="#d3d1c8" /></g>
                <g className="out">
                  <path d="M382 252 L418 150 L602 150 L638 252 Z" />
                  <line x1="418" y1="170" x2="602" y2="170" />
                </g>
              </g>

              {/* 04 tamburo */}
              <g className="part">
                <g transform="translate(430,342)">
                  <g className="spin sp-a">
                    <g className="sol"><circle r="56" fill="#cbc9c0" /><circle r="16" fill="#a8a69d" /></g>
                    <g className="out">
                      <circle r="56" /><circle r="16" />
                      <line x1="0" y1="-56" x2="0" y2="-24" /><line x1="0" y1="56" x2="0" y2="24" />
                      <line x1="-56" y1="0" x2="-24" y2="0" /><line x1="56" y1="0" x2="24" y2="0" />
                      <line x1="-40" y1="-40" x2="-17" y2="-17" /><line x1="40" y1="40" x2="17" y2="17" />
                      <line x1="40" y1="-40" x2="17" y2="-17" /><line x1="-40" y1="40" x2="-17" y2="17" />
                    </g>
                  </g>
                </g>
              </g>

              {/* 05 motore */}
              <g className="part">
                <g className="sol"><rect x="700" y="300" width="76" height="96" rx="4" fill="#c2c0b7" /></g>
                <g className="out">
                  <rect x="700" y="300" width="76" height="96" rx="4" />
                  <line x1="714" y1="310" x2="714" y2="386" /><line x1="726" y1="310" x2="726" y2="386" />
                  <line x1="738" y1="310" x2="738" y2="386" /><line x1="750" y1="310" x2="750" y2="386" />
                  <line x1="762" y1="310" x2="762" y2="386" />
                </g>
              </g>

              {/* 06 ingranaggio grande */}
              <g className="part">
                <g transform="translate(700,250)">
                  <g className="spin sp-b">
                    <g className="sol"><circle r="34" fill="#cbc9c0" /></g>
                    <g className="out"><circle r="38" strokeDasharray="6 7" /><circle r="30" /><circle r="9" /></g>
                  </g>
                </g>
              </g>

              {/* 07 ingranaggio piccolo */}
              <g className="part">
                <g transform="translate(756,206)">
                  <g className="spin sp-c">
                    <g className="sol"><circle r="19" fill="#cbc9c0" /></g>
                    <g className="out"><circle r="22" strokeDasharray="5 6" /><circle r="16" /><circle r="5" /></g>
                  </g>
                </g>
              </g>

              {/* 08 quadro comandi */}
              <g className="part">
                <g className="sol">
                  <rect x="556" y="286" width="96" height="74" rx="4" fill="#e6e4dc" />
                  <rect x="570" y="332" width="68" height="12" rx="2" fill="#b9b7ae" />
                </g>
                <g className="out">
                  <rect x="556" y="286" width="96" height="74" rx="4" />
                  <circle cx="578" cy="308" r="8" /><circle cx="604" cy="308" r="8" />
                  <rect x="570" y="332" width="68" height="12" rx="2" />
                </g>
                <circle className="led" cx="634" cy="308" r="5" />
              </g>

              {/* 09 scivolo */}
              <g className="part">
                <g className="sol"><path d="M642 432 L706 432 L732 486 L668 486 Z" fill="#d3d1c8" /></g>
                <g className="out"><path d="M642 432 L706 432 L732 486 L668 486 Z" /></g>
              </g>

              {/* 10 nastro */}
              <g className="part">
                <g className="sol"><rect x="176" y="370" width="126" height="20" rx="10" fill="#cbc9c0" /></g>
                <g className="out">
                  <rect x="176" y="370" width="126" height="20" rx="10" />
                  <g transform="translate(192,380)"><g className="spin sp-c"><circle className="out" r="7" /><line className="out" x1="-7" y1="0" x2="7" y2="0" /></g></g>
                  <g transform="translate(286,380)"><g className="spin sp-c"><circle className="out" r="7" /><line className="out" x1="-7" y1="0" x2="7" y2="0" /></g></g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="stage-foot">
          <div className="pbar"><i className="js-bar" /></div>
          <div className="phase-row">
            <span className="phase on">01 Geometria</span>
            <span className="phase">02 Tracciato</span>
            <span className="phase">03 Foglio tecnico</span>
            <span className="phase">04 Prende corpo</span>
            <span className="phase">05 Macchina pronta</span>
          </div>
        </div>
      </div>
    </section>
  );
}
