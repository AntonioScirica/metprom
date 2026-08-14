import { sanityFetch } from '../lib/sanity';
import InfoPageClient from './InfoPageClient';

export async function getInfoPage(type) {
  const [page, nav, footer, others] = await Promise.all([
    sanityFetch({ query: `*[_type == $type][0]`, params: { type } }),
    sanityFetch({ query: `*[_id == "navbar"][0]` }),
    sanityFetch({ query: `*[_id == "footer"][0]` }),
    sanityFetch({ query: `*[_id == "others"][0]` }),
  ]);
  return { page: page.data, nav: nav.data, footer: footer.data, infoEyebrow: others.data?.infoEyebrowLabel };
}

export default function InfoPage(props) {
  return <InfoPageClient {...props} />;
}
