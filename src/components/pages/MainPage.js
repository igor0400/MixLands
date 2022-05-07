import mainImg from '../../images/main3.png';
import player1 from '../../images/card-player1.png';
import player2 from '../../images/card-player2.png';
import player3 from '../../images/card-player3.png';

const MainPage = () => {
  const copyIp = (e) => {
    const btn = e.target.firstChild.data;
    const body = document.querySelector('body');
    const input = document.createElement('input');
    body.append(input);
    input.value = btn;
    input.select();
    document.execCommand('copy');
    input.remove();
  };

  const showPopower = () => {
    const btn = document.querySelector('.inline-blue');
    btn.innerHTML = 'Скопировано';
    setTimeout(() => {
      btn.innerHTML = 'play.mixlands.fun';
    }, 2000);
  };

  return (
    <div className="main-page">
      <section className="main">
        <div className="main__descr">
          <div className="title">
            <h1>Уникальный Minecraft Сервер</h1>
          </div>
          <div className="text">
            <p>
              MixLands - сервер нового уровня с продвинутыми механиками игры и
              интересным геймплеем. Нет доната, лишних плагинов, всё чисто и
              интересно.
            </p>
          </div>
          <div className="buttons">
            <button className="btn blue">Играть</button>
            <button
              className="btn inline-blue"
              id="btn"
              onClick={(e) => {
                copyIp(e);
                showPopower();
              }}
            >
              play.mixlands.fun
            </button>
          </div>
        </div>
        <div className="main__images">
          <img src={mainImg} alt="mixed" />
        </div>
      </section>
      <section className="features">
        <div className="features__title">
          <h2>Возможности сервера</h2>
        </div>
        <div className="features__cards">
          <div className="features__card">
            <img src={player3} alt="player" className="duck" />
            <h3>Торгуйте</h3>
            <p>
              На нашем сервере присутствует система игрового банка, вы сможете
              делать перевеоды из любого места в любое время другому игроку.
            </p>
          </div>
          <div className="features__card">
            <img src={player2} alt="player" />
            <h3>Выживайте</h3>
            <p>
              У нас ванильное выживание без лишних маханик, которые могут
              навредить игровому процессу. Мы стараемся сделать игру как можно
              комфортнее.
            </p>
          </div>
          <div className="features__card">
            <img src={player1} alt="player" />
            <h3>Ищите друзей</h3>
            <p>
              На сервере играют исключительно адекватные игроки, мы стараемся
              минимализовать количество гриферов и читеров.
            </p>
          </div>
        </div>
      </section>
      <section className="buy">
        <div className="buy__title">
          <h2>Заинтересовали?</h2>
        </div>
        <div className="buy__descr">
          <p>
            Если мы вас заинтересовали нашим сервером - заходите играть к нам!
            Для
          </p>
          <p>
            Для игры на сервере требуется покупка проходки, это сделано для
            того, что бы отсеивать гриферов и читеров.
          </p>
        </div>
        <div className="buy__btn">
          <button className="btn blue">Купить вход</button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
