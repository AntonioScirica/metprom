/* Genera un singolo file HTML autonomo, con GSAP incorporato e
   la sequenza "foglio tecnico → macchina" che parte da sola.
   Nessuna dipendenza esterna: funziona anche dentro un viewer mobile. */

import fs from 'fs';
import path from 'path';

const OUT = 'out';
let html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');

/* CSS compilato da Next */
const cssDir = path.join(OUT, '_next/static/css');
const css = fs.readdirSync(cssDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8'))
  .join('\n');

/* corpo della pagina, ripulito dagli script di Next */
let body = html.slice(html.indexOf('<body'), html.indexOf('</body>'));
body = body.slice(body.indexOf('>') + 1);
body = body.replace(/<script[\s\S]*?<\/script>/g, '');
body = body.replace(/<template[\s\S]*?<\/template>/g, '');
body = body.replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, '');

const gsapSrc = fs.readFileSync('node_modules/gsap/dist/gsap.min.js', 'utf8');

const runtime = `
(function(){
  var root = document.querySelector('.pin-wrap');
  if(!root) return;

  var q = function(s){ return root.querySelectorAll(s); };
  var parts   = Array.prototype.slice.call(q('.part'));
  var machine = root.querySelector('.machine');
  var pctEl   = root.querySelector('.js-pct');
  var lblEl   = root.querySelector('.js-lbl');
  var barEl   = root.querySelector('.js-bar');
  var phaseEls= Array.prototype.slice.call(q('.phase'));

  var PHASES = ['Tracciato','Foglio tecnico','Quote rimosse','Prende corpo','Macchina pronta'];
  var MARKS  = [0, 1.6, 3.6, 4.6, 8.4];
  var DROP = 6, SCALE_FROM = 0.992;

  parts.forEach(function(p){
    p.querySelectorAll('.out rect, .out circle, .out line, .out path, circle.out, line.out')
     .forEach(function(s){ s.setAttribute('pathLength','1'); });
  });
  var strokes = root.querySelectorAll('[pathLength]');

  function reset(){
    gsap.set(strokes, { strokeDasharray:1, strokeDashoffset:1 });
    gsap.set(q('.draw'), { strokeDashoffset:1 });
    gsap.set(q('.sol'), { opacity:0 });
    gsap.set(q('#scaffold .draw'), { strokeDashoffset:0 });
    gsap.set(q('.node'), { opacity:1 });
    gsap.set(q('.led'), { opacity:0 });
    gsap.set('#shadow', { opacity:0 });
    gsap.set('#annots', { opacity:0 });
    gsap.set('#sheet',  { opacity:0 });
    gsap.set('#scaffold', { opacity:1 });
    gsap.set(parts, { x:0, y:0, rotation:0, scale:1 });
    gsap.set(machine, { scale:1 });
    machine.classList.remove('run');
  }

  var tl;
  function build(){
    tl = gsap.timeline({
      paused:true,
      onUpdate:function(){
        var t = tl.time(), p = tl.progress();
        if(pctEl) pctEl.textContent = Math.round(p*100);
        if(barEl) barEl.style.width = (p*100)+'%';
        var i = 0;
        for(var k = MARKS.length-1; k >= 0; k--){ if(t >= MARKS[k]){ i = k; break; } }
        if(lblEl) lblEl.textContent = PHASES[i];
        phaseEls.forEach(function(e,j){ e.classList.toggle('on', j === i); });
        machine.classList.toggle('run', t > 8.6);
      }
    });

    parts.forEach(function(p,i){
      tl.to(p.querySelectorAll('[pathLength]'),
        { strokeDashoffset:0, duration:0.7, stagger:0.025, ease:'none' }, i*0.17);
    });

    tl.to('#sheet', { opacity:1, duration:0.5, ease:'power1.out' }, 1.6)
      .to(q('#sheet .draw'), { strokeDashoffset:0, duration:0.9, stagger:0.06, ease:'none' }, 1.6)
      .to(q('#annots .draw'), { strokeDashoffset:0, duration:0.8, ease:'none' }, 1.9)
      .to('#annots', { opacity:1, duration:0.7, ease:'power1.out' }, 1.9);

    tl.to({}, { duration:1.0 }, 2.8);

    tl.to('#scaffold', { opacity:0, duration:0.8, ease:'power1.inOut' }, 3.6)
      .to('#annots', { opacity:0, duration:0.9, ease:'power1.inOut' }, 3.8)
      .to('#sheet',  { opacity:0, duration:0.9, ease:'power1.inOut' }, 4.0);

    parts.forEach(function(p,i){
      var at = 4.6 + i*0.3;
      tl.fromTo(p, { y:-DROP, scale:SCALE_FROM },
        { y:0, scale:1, duration:1.0, ease:'power2.out', immediateRender:false }, at);
      tl.to(p.querySelectorAll('.sol'), { opacity:1, duration:0.8, ease:'power1.out' }, at);
    });

    tl.to(q('.led'), { opacity:1, duration:0.5, ease:'power1.out' }, 7.6)
      .to('#shadow', { opacity:0.13, duration:1.2, ease:'power1.out' }, 7.9);

    tl.to({}, { duration:1.6 }, 8.6);
    tl.timeScale(1.35);
  }

  reset(); build();

  var started = false;
  function start(){ if(started) return; started = true; tl.play(0); }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting) start(); });
    }, { threshold:0.25 });
    io.observe(root);
  }
  setTimeout(start, 1200);   // rete di sicurezza

  /* tocca o clicca per rivedere */
  root.style.cursor = 'pointer';
  root.addEventListener('click', function(){ reset(); tl.play(0); });

  var hint = root.querySelector('.js-hint');
  if(hint) hint.textContent = 'tocca per rivedere';

  /* titolo dell'hero */
  gsap.to('.line > span', { y:0, duration:1, ease:'power3.out', stagger:0.09, delay:0.2 });
})();
`;

const outHtml = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Met Prom Group — anteprima animazione</title>
<style>${css}</style>
<style>
  /* in questa anteprima la sezione non è agganciata allo scroll:
     la sequenza parte da sola e si può rigiocare al tocco */
  .pin-wrap{height:auto;min-height:96vh;overflow:visible}
  .pin-stage{height:auto;min-height:96vh;padding:96px 0 72px}
  .stage-bar{position:static;padding:0 28px 18px;max-width:1280px}
  .stage-foot{position:static;padding:26px 28px 0;max-width:1280px}
  .js-hint{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);display:block;margin-top:10px;text-align:right}
</style>
</head>
<body>
${body}
<script>${gsapSrc}</script>
<script>${runtime}</script>
</body>
</html>`;

fs.writeFileSync('../metprom-animazione.html', outHtml);
console.log('creato metprom-animazione.html —', Math.round(outHtml.length / 1024), 'KB');
