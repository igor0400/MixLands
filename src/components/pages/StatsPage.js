import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import axios from 'axios';
import Loading from '../loading/Loading';

import logo from '../../images/icons/logo-big-icon.png';

const StatsPage = () => {
  const [serverActive, setServerActive] = useState(false);
  const [online, setOnline] = useState(0);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [maxOnline, setMaxOnline] = useState(0);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.mcsrvstat.us/2/prp.plo.su').then((res) => {
      setServerActive(res.data.online);
      setOnline(res.data.players.online);
      setMaxOnline(res.data.players.max);
      setOnlinePlayers(res.data.players.list);
    });

    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        setLoading(false);
        const data = [];
        for (let key in res.data) {
          data.push(res.data[key]);
        }
        setPlayers(data);
      })
      .catch(() => setError(true));
  }, []);

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  const filterPost = (items, filter) => {
    const data = [];

    switch (filter) {
      case 'online':
        items.map((item) => {
          onlinePlayers.map((player) => {
            if (item.name === player) {
              data.push(item);
            }
          });
        });
        return data;
      default:
        return items;
    }
  };

  const visibleData = filterPost(searchEmp(players, term), filter);
  const sortVisibleData = visibleData.sort((a, b) => b.hours - a.hours);
  const namePlayer = (name) =>
    name.length > 10 ? `${name.slice(0, 10)}...` : name;

  return (
    <div className="stats-page">
      <div className="stats-page__chart">
        <div className="stats-page__chart__info">
          <div className="info__title">
            <div className="info__title__logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="info__title__descr">
              <h3>MixLands</h3>
              <div className="info__title__descr-p">
                <p style={{ color: '#A8A8A8' }}>Статус:</p>{' '}
                {serverActive ? (
                  <span className="green">Работает</span>
                ) : (
                  <span className="red">Не работатет</span>
                )}
              </div>
            </div>
          </div>
          <div className="info__stats">
            <p className="info__stats__online">
              Онлайн: <span style={{ color: '#52ff00' }}>{online}</span> из{' '}
              <span style={{ color: '#fff' }}>{maxOnline}</span>
            </p>
            <div className="info__stats__tps">
              <p>
                TPS:{' '}
                <span style={{ color: '#52ff00' }}>
                  {serverActive ? '20' : '0'}
                </span>
              </p>
            </div>
          </div>
          <div className="info__detals">
            <p className="info__detals__ip">
              IP: <span style={{ color: '#fff' }}>play.mixlands.fun</span>
            </p>
            <p className="info__detals__version">
              Версия: <span style={{ color: '#fff' }}>1.19</span>
            </p>
          </div>
        </div>
        <div style={{ width: '1200px' }}>
          <LineChart />
        </div>
      </div>
      <div className="stats-page__players">
        <div className="players__serch">
          <button onClick={() => setFilter('all')}>Все игроки</button>
          <button onClick={() => setFilter('online')}>Игроки онлайн</button>
          <input type="text" onChange={(e) => setTerm(e.target.value)} />
        </div>
        <div className="players__cards">
          {loading ? <Loading /> : null}
          {error ? 'error' : null}
          {!loading && !error
            ? sortVisibleData.map((item, i) => (
                <div className="player__card" key={i}>
                  <div className="player__card__img">
                    <img
                      src={`https://mc-heads.net/avatar/${item.name}`}
                      alt={namePlayer(item.name)}
                    />
                  </div>
                  <div className="player__card__descr">
                    <h3>{namePlayer(item.name)}</h3>
                    <h5>
                      Наиграно:{' '}
                      <span style={{ color: '#fff' }}>{item.hours}ч.</span>
                    </h5>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
