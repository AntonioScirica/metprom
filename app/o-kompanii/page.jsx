import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'О компании — РИММАКС' };

export default async function Page() {
  const { page, nav, footer, infoEyebrow } = await getInfoPage('oKompaniiPage');
  return <InfoPage page={page} nav={nav} footer={footer} infoEyebrow={infoEyebrow} fallbackTitle="О компании" />;
}
