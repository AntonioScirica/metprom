# Met Prom Group — sito (Next.js + GSAP)

Wireframe navigabile con la sezione "dal foglio tecnico alla macchina" animata su scroll.

## Avviare in locale

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

## Build di produzione

```bash
npm run build
npm run start
```

## Pubblicare online (link condivisibile)

Il modo più veloce è Vercel, che è di chi fa Next.js:

```bash
npx vercel
```

Al primo lancio ti chiede login e ti restituisce un URL di preview pubblico.
In alternativa: pusha la cartella su un repo GitHub e importalo da vercel.com — a ogni push ottieni un link di preview aggiornato.

## Struttura

```
app/
  layout.jsx      metadati e wrapper html
  page.jsx        tutte le sezioni della home + animazioni di reveal
  globals.css     design system completo (colori, tipografia, componenti)
components/
  Blueprint.jsx   la sezione pinnata: foglio tecnico → macchina
```

## La sezione animata

`components/Blueprint.jsx` è una timeline GSAP con ScrollTrigger in `pin` + `scrub`.
La macchina (inventata, siglata MPG-T2) è un SVG con 10 gruppi `.part`; ogni gruppo
contiene una versione a tratto (`.out`) e una piena (`.sol`).

Fasi della timeline:

1. il foglio si traccia (`stroke-dashoffset` sugli elementi `.draw`)
2. pausa: il disegno resta leggibile
3. quote, palloncini, cartiglio e carta si dissolvono
4. ogni pezzo si stacca dal foglio e torna al suo posto diventando metallo (in sequenza 01→10)
5. ombra a terra, poi la macchina si avvia: ingranaggi in rotazione e LED acceso

Per regolare la durata: `end: '+=480%'` nello ScrollTrigger.
Per regolare lo scatto di ogni pezzo: array `SETTLE` in cima al file.

## Placeholder

Tutti i riquadri con crocino diagonale sono segnaposto per foto e video:
riportano il formato e il soggetto suggerito. Vanno sostituiti con
`next/image` (foto) o `<video>` (hero) quando il materiale è pronto.

## Da completare

- contenuti reali: numeri aziendali, storia, certificazioni
- foto e video di officina, prodotti e settori
- pagine interne: Servizi, Settori, Portfolio, Area clienti
- form preventivo con invio reale
- versione russa (i18n) — il pubblico principale è russofono
