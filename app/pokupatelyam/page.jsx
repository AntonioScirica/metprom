import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'Покупателям — РИММАКС' };

export default async function Page() {
  const { page, nav, footer } = await getInfoPage('pokupatelyamPage');
  return <InfoPage page={page} nav={nav} footer={footer} fallbackTitle="Покупателям" />;
}
