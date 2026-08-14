import { client, urlFor, fileUrlFor } from '../lib/sanity';
import Home from '../components/Home';

async function getData() {
  const [home, nav, footer] = await Promise.all([
    client.fetch(`*[_id == "homePage"][0]`),
    client.fetch(`*[_id == "navbar"][0]`),
    client.fetch(`*[_id == "footer"][0]`),
  ]);

  const homeData = home ? {
    ...home,
    heroVideoUrl: fileUrlFor(home.heroVideo),
    servizi: (home.servizi || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo) })),
    settori: (home.settori || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo) })),
    lavori: (home.lavori || []).map((w) => ({ ...w, photoUrl: urlFor(w.photo) })),
  } : null;

  return { home: homeData, nav, footer };
}

export default async function Page() {
  const { home, nav, footer } = await getData();
  return <Home home={home} nav={nav} footer={footer} />;
}
