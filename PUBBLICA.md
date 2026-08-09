# Pubblicare il sito

Il repository git è già inizializzato, con il primo commit fatto sul branch `main`.

## Opzione A — GitHub + Vercel (link stabile, si aggiorna a ogni push)

1. Crea un repo vuoto su github.com (senza README, senza .gitignore)
2. Dalla cartella del progetto:

```bash
git remote add origin https://github.com/<tuo-utente>/<nome-repo>.git
git push -u origin main
```

3. Vai su vercel.com → Add New → Project → importa il repo → Deploy
   Vercel riconosce Next.js da solo, non serve configurare nulla.

## Opzione B — Vercel da terminale (più veloce)

```bash
npm install
npx vercel
```

Al primo lancio chiede il login e restituisce subito l'URL di preview pubblico.
`npx vercel --prod` per la versione definitiva.

## Opzione C — Netlify Drop (nessun account, 30 secondi)

```bash
npm install
npm run build
```

Poi trascina la cartella `out` generata su https://app.netlify.com/drop

## In locale

```bash
npm install
npm run dev
```

http://localhost:3000

Nota: la cartella `out` va servita da un web server, non aperta con doppio click
sul file index.html (i percorsi degli asset sono assoluti). In locale: `npx serve out`
