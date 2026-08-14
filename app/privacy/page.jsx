import InfoPage, { getInfoPage } from '../../components/InfoPage';

export const metadata = { title: 'Политика конфиденциальности — РИММАКС' };

export default async function Page() {
  const { page, nav, footer, infoEyebrow } = await getInfoPage('privacyPage');
  return <InfoPage page={page} nav={nav} footer={footer} infoEyebrow={infoEyebrow} fallbackTitle="Политика конфиденциальности" />;
}
