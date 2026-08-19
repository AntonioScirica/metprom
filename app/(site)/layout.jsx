import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive, sanityFetch } from '../../lib/sanity';
import CookieBanner from '../../components/CookieBanner';
import GiftIntro from '../../components/GiftIntro';
import '../globals.css';

export default async function SiteLayout({ children }) {
  const [{ isEnabled: isDraft }, others, cookieBanner] = await Promise.all([
    draftMode(),
    sanityFetch({ query: `*[_id == "others"][0]` }),
    sanityFetch({ query: `*[_id == "cookieBanner"][0]` }),
  ]);
  const logoSize = others.data?.logoSize || 85;

  return (
    <div style={{ '--logo-size': `${logoSize}px` }}>
      {children}
      <GiftIntro />
      <CookieBanner data={cookieBanner.data} />
      <SanityLive />
      {isDraft && <VisualEditing />}
    </div>
  );
}
