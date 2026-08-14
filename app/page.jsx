import { client, urlFor, fileUrlFor } from '../lib/sanity';
import Home from '../components/Home';

async function getData() {
  const [hero, metodo, servizi, settori, numeri, lavori, processo, contatti, nav, footer] = await Promise.all([
    client.fetch(`*[_id == "heroSection"][0]`),
    client.fetch(`*[_id == "metodoSection"][0]`),
    client.fetch(`*[_id == "serviziSection"][0]`),
    client.fetch(`*[_id == "settoriSection"][0]`),
    client.fetch(`*[_id == "numeriSection"][0]`),
    client.fetch(`*[_id == "lavoriSection"][0]`),
    client.fetch(`*[_id == "processoSection"][0]`),
    client.fetch(`*[_id == "contattiSection"][0]`),
    client.fetch(`*[_id == "navbar"][0]`),
    client.fetch(`*[_id == "footer"][0]`),
  ]);

  const home = {
    ...hero,
    heroVideoUrl: fileUrlFor(hero?.heroVideo),
    ...metodo,
    ...servizi,
    servizi: (servizi?.servizi || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo) })),
    ...settori,
    settori: (settori?.settori || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo) })),
    ...numeri,
    ...lavori,
    lavori: (lavori?.lavori || []).map((w) => ({ ...w, photoUrl: urlFor(w.photo) })),
    ...processo,
    ...contatti,
  };

  return { home, nav, footer };
}

export default async function Page() {
  const { home, nav, footer } = await getData();
  return <Home home={home} nav={nav} footer={footer} />;
}
