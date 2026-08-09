import './globals.css';

export const metadata = {
  title: 'Met Prom Group — Macchine e componenti industriali su misura',
  description:
    'Progettazione e produzione di attrezzature, ricambi e componenti industriali su misura per agricoltura, industria alimentare e industria pesante.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
