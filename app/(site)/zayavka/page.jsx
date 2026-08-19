import { sanityFetch } from '../../../lib/sanity';
import ZayavkaClient from './ZayavkaClient';

export const metadata = { title: 'Заявка на расчёт — РИММАКС' };

export default async function Page() {
  const [nav, footer, page, formSettings] = await Promise.all([
    sanityFetch({ query: `*[_id == "navbar"][0]` }),
    sanityFetch({ query: `*[_id == "footer"][0]` }),
    sanityFetch({ query: `*[_id == "zayavkaSection"][0]` }),
    sanityFetch({ query: `*[_id == "contactFormSettings"][0]` }),
  ]);
  return <ZayavkaClient nav={nav.data} footer={footer.data} page={page.data} formSettings={formSettings.data} />;
}
