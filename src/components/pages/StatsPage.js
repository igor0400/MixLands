import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import axios from 'axios';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';

import logo from '../../images/icons/logo-big-icon.png';
import copy from '../../images/icons/copy.svg';
import bea from '../../images/bea.svg';
import phantom from '../../images/phantom.webp';
import faceDefault from '../../images/face-default.png';

const StatsPage = ({ players, loading, error, setActivePlayer, copyText }) => {
   const [serverActive, setServerActive] = useState(false);
   const [online, setOnline] = useState(0);
   const [onlinePlayers, setOnlinePlayers] = useState([]);
   const [maxOnline, setMaxOnline] = useState(0);
   const [filter, setFilter] = useState('all');
   const [term, setTerm] = useState('');
   const [loadingServerActive, setLoadingServerActive] = useState(true);

   useEffect(() => {
      axios.get('https://api.mcsrvstat.us/2/prp.plo.su').then((res) => {
         setLoadingServerActive(false);
         if (res.data) {
            setServerActive(res.data.online);
            if (res.data.players) {
               setOnline(res.data.players.online);
               setMaxOnline(res.data.players.max);
               setOnlinePlayers(res.data.players.list);
            }
         }
      });
   }, []);

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
            if (onlinePlayers) {
               items.map((item) => {
                  onlinePlayers.map((player) => {
                     if (item.name === player) {
                        data.push(item);
                     }
                  });
               });
            }
            return data;
         default:
            return items;
      }
   };

   const visibleData = filterPost(searchEmp(players, term), filter);
   const sortVisibleData = visibleData.sort((a, b) => b.hours - a.hours);
   const namePlayer = (name) =>
      name.length > 11 ? `${name.slice(0, 11)}...` : name;

   return (
      <div className="stats-page mw1400 animate__animated animate__fadeIn">
         <div className="stats-page__chart">
            <img src={bea} alt="bea" className="bea" />
            <div className="stats-page__chart__info">
               <div className="info__logo">
                  <img src={logo} alt="logo" />
               </div>
               <div className="info__descr">
                  <div className="info__descr__title">
                     <h3>MixLands</h3>
                     {loadingServerActive ? (
                        <span className="blue"></span>
                     ) : null}
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
                     IP:{' '}
                     <span style={{ color: '#fff' }}>play.mixlands.space</span>
                     <img
                        src={copy}
                        alt="copy"
                        className="ip__copy"
                        onClick={() => copyText('play.mixlands.space')}
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
            {error ? (
               <div className="error">
                  <img src={phantom} alt="phantom" />
                  <h4>Ошибка</h4>
               </div>
            ) : null}
            {!loading && !error ? (
               sortVisibleData && sortVisibleData.length > 0 ? (
                  <div className="players__cards">
                     {sortVisibleData.map((item, i) => (
                        <Link
                           to={`/${item.name}`}
                           key={i}
                           onClick={() => {
                              setActivePlayer(item);
                              localStorage.setItem(
                                 'activePlayer',
                                 JSON.stringify(item)
                              );
                           }}
                        >
                           <div className="player__card">
                              <div className="player__card__img">
                                 <img
                                    src={`https://mc-heads.net/avatar/${item.name}`}
                                    alt={namePlayer(item.name)}
                                    onError={(e) =>
                                       (e.target.src = faceDefault)
                                    }
                                 />
                                 {onlinePlayers
                                    ? onlinePlayers.map((player, i) =>
                                         item.name === player ? (
                                            <div
                                               className="player__active__circle"
                                               key={i}
                                            ></div>
                                         ) : null
                                      )
                                    : null}
                              </div>
                              <div className="player__card__descr">
                                 <h3>{namePlayer(item.name)}</h3>
                                 <h5>
                                    Наиграно:{' '}
                                    <span style={{ color: '#fff' }}>
                                       {item.hours}ч.
                                    </span>
                                 </h5>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               ) : (
                  <h3 className="null-players">Игроков не найдено</h3>
               )
            ) : null}
         </div>
      </div>
   );
};

export default StatsPage;
