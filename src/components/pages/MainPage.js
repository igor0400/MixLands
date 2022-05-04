import mainImg from '../../images/main.png';
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

  const showPopower = (e) => {
    const btn = document.querySelector('.inline-purple');
    btn.innerHTML = 'Скопировано';
    setTimeout(() => {
      btn.innerHTML = 'play.mixlands.fun';
    }, 2000);
  };

  return (
    <div className="main-page">
      <div className="main">
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
            <button className="btn purple">Играть</button>
            <button
              className="btn inline-purple"
              id="btn"
              onClick={(e) => {
                copyIp(e);
                showPopower(e);
              }}
            >
              play.mixlands.fun
            </button>
          </div>
        </div>
        <div className="main__images">
          <img src={mainImg} alt="mixed" />
        </div>
      </div>
      <div className="features">
        <div className="title">
          <h2>Возможности сервера</h2>
        </div>
        <div className="cards">
          <div className="card">
            <img src={player3} alt="player" className='duck'/>
            <h3>Торгуйте</h3>
            <p>
              На нашем сервере присутствует система игрового банка, вы сможете
              делать перевеоды из любого места в любое время другому игроку.
            </p>
          </div>
          <div className="card">
            <img src={player2} alt="player" />
            <h3>Выживайте</h3>
            <p>
              У нас ванильное выживание без лишних маханик, которые могут
              навредить игровому процессу. Мы стараемся сделать игру как можно
              комфортнее.
            </p>
          </div>
          <div className="card">
            <img src={player1} alt="player" />
            <h3>Ищите друзей</h3>
            <p>
              На сервере играют исключительно адекватные игроки, мы стараемся
              минимализовать количество гриферов и читеров.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
