import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = { title: 'Вакансии — Met Prom Group' };

export default function Page() {
  return (
    <div>
      <div className="grid-bg" />
      <Header />

      <section className="sec" style={{ paddingTop: 150 }}>
        <div className="wrap">
          <div className="sec-head"><span className="mono">01 — Информация</span><span className="mono">Вакансии</span></div>
          <h1 className="h2">Вакансии</h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: '60ch' }}>Открытые позиции — материалы уточняются.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
