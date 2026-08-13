export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}><span className="mk" />MET&nbsp;PROM&nbsp;GROUP</div>
            <p className="mono" style={{ maxWidth: '30ch', lineHeight: 1.9 }}>Проектирование и производство машин и промышленных комплектующих на заказ.</p>
          </div>
          <nav><span className="mono" style={{ marginBottom: 6 }}>Сайт</span><a href="/#metodo">Метод</a><a href="/#servizi">Услуги</a><a href="/#settori">Отрасли</a><a href="/#lavori">Работы</a></nav>
          <nav><span className="mono" style={{ marginBottom: 6 }}>Информация</span><a href="/o-kompanii">О компании</a><a href="/pokupatelyam">Покупателям</a><a href="/biblioteka">Библиотека</a><a href="/vakansii">Вакансии</a></nav>
        </div>
        <div className="foot-b"><span className="mono">© 2026 Met Prom Group</span><span className="mono">Конфиденциальность · Cookie</span></div>
      </div>
    </footer>
  );
}
