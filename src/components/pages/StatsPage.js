import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import axios from 'axios';
import Loading from '../loading/Loading';
import { Helmet } from 'react-helmet';

import logo from '../../images/icons/logo-big-icon.png';
import copy from '../../images/icons/copy.svg';
import bea from '../../images/bea.svg';

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
  const [loadingServerActive, setLoadingServerActive] = useState(true);
  const [admins, setAdmins] = useState(['Swingor', 'm1xeee']);

  useEffect(() => {
    axios.get('https://api.mcsrvstat.us/2/prp.plo.su').then((res) => {
      setLoadingServerActive(false);
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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const copyIp = () => {
    const btn = 'play.mixlands.fun';
    const body = document.querySelector('body');
    const input = document.createElement('input');
    body.append(input);
    input.value = btn;
    input.select();
    document.execCommand('copy');
    input.remove();
  };

  const copyAlert = () => {
    const body = document.querySelector('body');
    const item = document.createElement('div');
    item.classList.add('copy-alert');
    item.innerHTML = 'Скопировано';
    body.append(item);
    setTimeout(() => {
      item.remove();
    }, 2000);
  };

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => item.name.toLowerCase().indexOf(term) > -1);
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

  const getColor = (item) => {
    let color = '#fff';

    admins.forEach((admin) => {
      if (item === admin) {
        color = '#ff4444';
      }
    });

    return color;
  };

  const visibleData = filterPost(searchEmp(players, term), filter);
  const sortVisibleData = visibleData.sort((a, b) => b.hours - a.hours);
  const namePlayer = (name) =>
    name.length > 11 ? `${name.slice(0, 11)}...` : name;

  return (
    <div className="stats-page mw1400">
      <Helmet>
        <title>{'MixLands > Статистика'}</title>
      </Helmet>
      <div className="stats-page__chart">
        <img src={bea} alt="bea" className="bea" />
        <div className="stats-page__chart__info">
          <div className="info__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="info__descr">
            <div className="info__descr__title">
              <h3>MixLands</h3>
              {loadingServerActive ? <span className="blue"></span> : null}
              {!loadingServerActive ? (
                serverActive ? (
                  <div className="green"></div>
                ) : (
                  <div className="red"></div>
                )
              ) : null}
            </div>
            <p className="info__descr__online">
              Онлайн: <span style={{ color: '#fff' }}>{online}</span> из{' '}
              <span style={{ color: '#fff' }}>{maxOnline}</span>
            </p>
            <p className="info__descr__ip">
              IP: <span style={{ color: '#fff' }}>play.mixlands.fun</span>
              <img
                src={copy}
                alt="copy"
                className="ip__copy"
                onClick={() => {
                  copyIp();
                  copyAlert();
                }}
              />
            </p>
          </div>
        </div>
        <div style={{ width: '100.2%' }}>
          <LineChart />
        </div>
      </div>
      <div className="stats-page__players">
        <div className="players__serch">
          <div className="players__serch__buttons">
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'button-active' : null}
            >
              Все игроки
            </button>
            <button
              onClick={() => setFilter('online')}
              className={filter === 'online' ? 'button-active' : null}
            >
              Игроки онлайн
            </button>
          </div>
          <input
            placeholder="Поиск..."
            type="text"
            onChange={(e) => setTerm(e.target.value.toLowerCase())}
          />
        </div>
        {loading ? <Loading /> : null}
        {error ? <h2>Error</h2> : null}
        <div className="players__cards">
          {!loading && !error ? (
            sortVisibleData.length > 0 ? (
              sortVisibleData.map((item, i) => (
                <div className="player__card" key={i}>
                  <div className="player__card__img">
                    <img
                      src={`https://mc-heads.net/avatar/${item.name}`}
                      alt={namePlayer(item.name)}
                    />
                    {onlinePlayers.map((player, i) =>
                      item.name === player ? (
                        <div className="player__active__circle" key={i}></div>
                      ) : null
                    )}
                  </div>
                  <div className="player__card__descr">
                    <h3
                      style={{
                        color: getColor(item.name),
                      }}
                    >
                      {namePlayer(item.name)}
                    </h3>
                    <h5>
                      Наиграно:{' '}
                      <span style={{ color: '#fff' }}>{item.hours}ч.</span>
                    </h5>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="null-players">Игроков не найдено</h2>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
