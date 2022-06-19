import mainImg from '../../images/main3.png';
import player1 from '../../images/card-player1.png';
import player2 from '../../images/card-player2.png';
import player3 from '../../images/card-player3.png';

const MainPage = ({ handleShow, copyText }) => {
   return (
      <div className="main-page mw1400 animate__animated animate__fadeIn">
         <section className="main-page__main">
            <div className="main__descr">
               <div className="title">
                  <h1>
                     Уникальный <br /> Minecraft <br /> Сервер
                  </h1>
               </div>
               <div className="text">
                  <p className="grey-p">
                     MixLands - сервер нового уровня с продвинутыми механиками
                     игры и интересным геймплеем. Нет доната, лишних плагинов,
                     всё чисто и интересно.
                  </p>
               </div>
               <div className="buttons">
                  <button className="btn btn-blue" onClick={handleShow}>
                     Играть
                  </button>
                  <button
                     className="btn btn-inline-blue main-ip-btn"
                     onClick={() => {
                        copyText('play.mixlands.space');
                     }}
                  >
                     <span
                        id="main-ip-btn"
                        onClick={() => {
                           copyText('play.mixlands.space');
                        }}
                     >
                        play.mixlands.space
                     </span>
                  </button>
               </div>
            </div>
            <div className="main__images">
               <img src={mainImg} alt="mixed" />
            </div>
         </section>
         <section className="features ">
            <div className="features__title">
               <h2 className="titleh2">Возможности сервера</h2>
            </div>
            <div className="features__cards">
               <div className="features__card">
                  <img src={player3} alt="player" className="duck" />
                  <h3 className="titleh3">Торгуйте</h3>
                  <p className="grey-p">
                     На нашем сервере присутствует система игрового банка, вы
                     сможете делать переводы из любого места в любое время
                     другому игроку.
                  </p>
               </div>
               <div className="features__card">
                  <img src={player2} alt="player" />
                  <h3 className="titleh3">Выживайте</h3>
                  <p className="grey-p">
                     У нас ванильное выживание без лишних механик, которые могут
                     навредить игровому процессу. Мы стараемся сделать как можно
                     более комфортную игру.
                  </p>
               </div>
               <div className="features__card">
                  <img src={player1} alt="player" />
                  <h3 className="titleh3">Ищите друзей</h3>
                  <p className="grey-p">
                     На сервере играют исключительно адекватные игроки, мы
                     стараемся минимализовать количество гриферов и читеров.
                  </p>
               </div>
            </div>
         </section>
         <section className="buy">
            <div className="buy__title">
               <h2 className="titleh2">Заинтересовали?</h2>
            </div>
            <div className="buy__descr">
               <p className="grey-p">
                  Если мы вас заинтересовали нашим сервером - заходите играть к
                  нам!
               </p>
               <p className="grey-p">
                  Для игры на сервере требуется покупка проходки, это сделано
                  для того, что бы отсеивать гриферов и читеров.
               </p>
            </div>
            <div className="buy__btn">
               <button className="btn btn-blue" onClick={handleShow}>
                  Купить вход
               </button>
            </div>
         </section>
      </div>
   );
};

export default MainPage;
