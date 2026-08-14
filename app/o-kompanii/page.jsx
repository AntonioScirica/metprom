import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'О компании — Met Prom Group' };

export default async function Page() {
  const { page, nav, footer } = await getInfoPage('oKompaniiPage');
  return <InfoPage page={page} nav={nav} footer={footer} fallbackTitle="О компании" />;
}
