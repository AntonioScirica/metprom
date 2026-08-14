import { client } from '../lib/sanity';
import InfoPageClient from './InfoPageClient';

export async function getInfoPage(type) {
  const [page, nav, footer] = await Promise.all([
    client.fetch(`*[_type == $type][0]`, { type }),
    client.fetch(`*[_id == "navbar"][0]`),
    client.fetch(`*[_id == "footer"][0]`),
  ]);
  return { page, nav, footer };
}

export default function InfoPage(props) {
  return <InfoPageClient {...props} />;
}
