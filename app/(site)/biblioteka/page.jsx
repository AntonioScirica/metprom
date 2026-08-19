import InfoPage, { getInfoPage } from '../../../components/InfoPage';

export const metadata = { title: 'Библиотека — РИММАКС' };

export default async function Page() {
  const { page, nav, footer, infoEyebrow } = await getInfoPage('bibliotekaPage');
  return <InfoPage page={page} nav={nav} footer={footer} infoEyebrow={infoEyebrow} fallbackTitle="Библиотека" />;
}
