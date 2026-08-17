import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive, sanityFetch } from '../lib/sanity';
import CookieBanner from '../components/CookieBanner';
import GiftIntro from '../components/GiftIntro';
import './globals.css';

export const metadata = {
  title: 'РИММАКС — машины и промышленные комплектующие на заказ',
  description:
    'Проектирование и производство оборудования, запчастей и промышленных комплектующих на заказ для сельского хозяйства, пищевой и тяжёлой промышленности.',
};

export default async function RootLayout({ children }) {
  const [{ isEnabled: isDraft }, others, cookieBanner] = await Promise.all([
    draftMode(),
    sanityFetch({ query: `*[_id == "others"][0]` }),
    sanityFetch({ query: `*[_id == "cookieBanner"][0]` }),
  ]);
  const logoSize = others.data?.logoSize || 85;

  return (
    <html lang="ru" style={{ '--logo-size': `${logoSize}px` }}>
      <body>
        {children}
        <GiftIntro />
        <CookieBanner data={cookieBanner.data} />
        <SanityLive />
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
