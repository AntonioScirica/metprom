import { sanityFetch, urlFor, fileUrlFor } from '../lib/sanity';
import Home from '../components/Home';

async function getData() {
  const [hero, animation, ticker, metodo, servizi, settori, numeri, lavori, processo, contatti, nav, footer] = await Promise.all([
    sanityFetch({ query: `*[_id == "heroSection"][0]` }),
    sanityFetch({ query: `*[_id == "animationSection"][0]` }),
    sanityFetch({ query: `*[_id == "tickerSection"][0]` }),
    sanityFetch({ query: `*[_id == "metodoSection"][0]` }),
    sanityFetch({ query: `*[_id == "serviziSection"][0]` }),
    sanityFetch({ query: `*[_id == "settoriSection"][0]` }),
    sanityFetch({ query: `*[_id == "numeriSection"][0]` }),
    sanityFetch({ query: `*[_id == "lavoriSection"][0]` }),
    sanityFetch({ query: `*[_id == "processoSection"][0]` }),
    sanityFetch({ query: `*[_id == "contattiSection"][0]` }),
    sanityFetch({ query: `*[_id == "navbar"][0]` }),
    sanityFetch({ query: `*[_id == "footer"][0]` }),
  ]);

  const home = {
    ...hero.data,
    heroVideoUrl: fileUrlFor(hero.data?.heroVideo),
    tickerItems: ticker.data?.items || [],
    ...metodo.data,
    ...servizi.data,
    servizi: (servizi.data?.servizi || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo) })),
    ...settori.data,
    settori: (settori.data?.settori || []).map((s) => ({ ...s, photoUrl: urlFor(s.photo), videoUrl: fileUrlFor(s.video) })),
    ...numeri.data,
    ...lavori.data,
    lavori: (lavori.data?.lavori || []).map((w) => ({ ...w, photoUrl: urlFor(w.photo) })),
    ...processo.data,
    ...contatti.data,
  };

  return { home, animation: animation.data, nav: nav.data, footer: footer.data };
}

export default async function Page() {
  const { home, animation, nav, footer } = await getData();
  return <Home home={home} animation={animation} nav={nav} footer={footer} />;
}
