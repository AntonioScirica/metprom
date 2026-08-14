import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '../lib/sanity';
import './globals.css';

export const metadata = {
  title: 'Met Prom Group — машины и промышленные комплектующие на заказ',
  description:
    'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.',
};

export default async function RootLayout({ children }) {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="ru">
      <body>
        {children}
        <SanityLive />
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
