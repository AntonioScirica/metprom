import './globals.css';

export const metadata = {
  title: 'Met Prom Group — машины и промышленные комплектующие на заказ',
  description:
    'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
