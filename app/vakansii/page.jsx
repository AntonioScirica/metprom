import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'Вакансии — РИММАКС' };

export default async function Page() {
  const { page, nav, footer, infoEyebrow } = await getInfoPage('vakansiiPage');
  return <InfoPage page={page} nav={nav} footer={footer} infoEyebrow={infoEyebrow} fallbackTitle="Вакансии" />;
}
