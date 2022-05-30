import { Helmet } from 'react-helmet';

const ShopPage = ({ handleShow }) => {
  return (
    <div className="shop-page animate__animated animate__fadeIn">
      <Helmet>
        <title>{'MixLands > Магазин'}</title>
      </Helmet>
      <section className="shop-page__descr">
        <h3 className="titleh3">Товары сервера</h3>
        <p className="grey-p">
          В данном разделе сайта вы можете купить любой доступный товар на нашем
          сервере. Возврат средств за любой товар на данный момент невозможен.
          Связано это с большой комиссией в переводах или же вовсе их
          недоступность. Иногда могут быть исключения по возврату.
        </p>
      </section>
      <section className="shop-page__cards">
        <div className="shop-page__card">
          <div>
            {' '}
            <div className="card__title">
              <h2 className="titleh2">Проходка</h2>
            </div>
            <div className="card__text">
              <p className="text-white">Вход на сервер</p>
              <p className="text-accent">
                После покупки данного товара вам будет выдан доступ к серверам{' '}
                <span style={{ color: '#BAB4C3' }}>MixLands</span>.
              </p>
              <p className="text-accent">
                Перед покупкой проходки хорошо обдумайте свой выбор.
              </p>
              <p className="text-accent">Возврат средст невозможен.</p>
            </div>
          </div>
          <div className="card__btn">
            <div>
              <p className="text-white">Стоимость: 300рублей/навсегда</p>
              <button onClick={handleShow}>Купить</button>
            </div>
          </div>
        </div>
        <div className="shop-page__card">
          <div>
            <div className="card__title">
              <h2 className="titleh2">MixLands NITRO</h2>
            </div>
            <div className="card__text">
              <p className="text-white">Спонсор сервера</p>
              <p className="text-accent">
                После покупки данного товара вам будет выдан{' '}
                <span style={{ color: '#BAB4C3' }}>спонсор</span> на сервере.
              </p>
              <p className="text-accent">
                Данный товар <span style={{ color: '#BAB4C3' }}>не даёт</span>{' '}
                никакого преимущества над игроками сервера, а всего-лишь
                добавляет пользователю желтый ник в чате, желтый значок в табе и
                желтый значок над головой.
              </p>
            </div>
          </div>
          <div className="card__btn">
            <div>
              <p className="text-white">Стоимость: 100рублей/месяц</p>
              <button onClick={handleShow}>Купить</button>
            </div>
          </div>
        </div>
      </section>
      <section className="shop-page__afert">
        <p className="grey-p">
          Покупая любой товар на нашем сайте вы соглашаетесь с{' '}
          <a href="#">офертой</a>. Дополнительно напомним, что средства не могут
          быть возвращены, поэтому вам стоит хорошо подумать перед покупкой того
          или иного товара.
        </p>
        <p className="grey-p">С уважением, администрация проекта MixLands.</p>
      </section>
    </div>
  );
};

export default ShopPage;
