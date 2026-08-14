import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'Политика использования cookie — РИММАКС' };

export default async function Page() {
  const { page, nav, footer, infoEyebrow } = await getInfoPage('cookiePage');
  return <InfoPage page={page} nav={nav} footer={footer} infoEyebrow={infoEyebrow} fallbackTitle="Политика использования cookie" />;
}
