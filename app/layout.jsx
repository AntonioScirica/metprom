import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive, sanityFetch } from '../lib/sanity';
import './globals.css';

export const metadata = {
  title: 'РИММАКС — машины и промышленные комплектующие на заказ',
  description:
    'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.',
};

export default async function RootLayout({ children }) {
  const [{ isEnabled: isDraft }, others] = await Promise.all([
    draftMode(),
    sanityFetch({ query: `*[_id == "others"][0]` }),
  ]);
  const logoSize = others.data?.logoSize || 85;

  return (
    <html lang="ru" style={{ '--logo-size': `${logoSize}px` }}>
      <body>
        {children}
        <SanityLive />
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
