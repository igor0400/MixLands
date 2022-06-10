const ShopPage = ({ handleShow }) => {
   return (
      <div className="shop-page mw1400 animate__animated animate__fadeIn">
         <section className="shop-page__descr">
            <h3 className="titleh3">Товары сервера</h3>
            <p className="grey-p">
               В данном разделе сайта вы можете купить любой доступный товар на
               нашем сервере.
            </p>
         </section>
         <section className="shop-page__cards">
            <div className="shop-page__card">
               <div>
                  <div className="card__top">
                     <h2 className="titleh2">Проходка</h2>
                     <p className="text-white">Вход на сервер</p>
                  </div>
               </div>
               <div className="card__bottom">
                  <p className="text-white">Стоимость: 300рублей/навсегда</p>
                  <button
                     className="btn btn-blue card__btn"
                     onClick={handleShow}
                  >
                     Купить
                  </button>
               </div>
            </div>
            <div className="shop-page__card">
               <div>
                  <div className="card__top">
                     <h2 className="titleh2">Нитро</h2>
                     <p className="text-white">Спонсор сервера</p>
                  </div>
               </div>
               <div className="card__bottom">
                  <p className="text-white">Стоимость: 100рублей/месяц</p>
                  <button
                     className="btn btn-blue card__btn"
                     onClick={handleShow}
                  >
                     Купить
                  </button>
               </div>
            </div>
            <div className="shop-page__card">
               <div>
                  <div className="card__top">
                     <h2 className="titleh2">Разбан</h2>
                     <p className="text-white">Разбан на сервере</p>
                  </div>
               </div>
               <div className="card__bottom">
                  <p className="text-white">Стоимость: 300рублей/навсегда</p>
                  <button
                     className="btn btn-blue card__btn"
                     onClick={handleShow}
                  >
                     Купить
                  </button>
               </div>
            </div>
         </section>
         <section className="shop-page__afert">
            <p className="grey-p">
               Покупая любой товар на нашем сайте вы соглашаетесь с{' '}
               <a href="#">офертой</a>.
            </p>
            <p className="grey-p">
               С уважением, администрация проекта MixLands.
            </p>
         </section>
      </div>
   );
};

export default ShopPage;
