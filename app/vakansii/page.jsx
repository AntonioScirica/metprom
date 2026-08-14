import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'Вакансии — Met Prom Group' };

export default async function Page() {
  const { page, nav, footer } = await getInfoPage('vakansiiPage');
  return <InfoPage page={page} nav={nav} footer={footer} fallbackTitle="Вакансии" />;
}
