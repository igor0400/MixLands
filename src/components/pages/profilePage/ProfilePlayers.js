import { useState } from 'react';

import faceDefault from '../../../images/face-default.png';

const ProfilePlayers = ({ players }) => {
   const [playersContent, setPlayersContent] = useState('topHours');

   const namePlayer = (name) =>
      name.length > 11 ? `${name.slice(0, 9)}...` : name;

   const getBalance = (item) =>
      item < 64
         ? `${item} MK`
         : item >= 64
         ? item % 64 === 0
            ? `${Math.floor(item / 64)} CMK`
            : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
         : '0 MK';

   return (
      <div className="profile-page__players animate__animated animate__fadeIn duration05">
         <div className="profile-page__players__navs">
            <button
               onClick={() => setPlayersContent('topHours')}
               className={playersContent === 'topHours' ? 'nav-active' : null}
            >
               Наигранные часы
            </button>
            <button
               onClick={() => setPlayersContent('topBalance')}
               className={playersContent === 'topBalance' ? 'nav-active' : null}
            >
               Баланс
            </button>
         </div>
         {playersContent === 'topHours' ? (
            <div className="profile-page__players__top-hours">
               {players.length === 0
                  ? null
                  : players
                       .sort((a, b) => a.hours - b.hours)
                       .reverse()
                       .slice(0, 16)
                       .map((item, i) => (
                          <div className="top-hours__card" key={i}>
                             <div className="top-hours__card__img">
                                <img
                                   src={`https://mc-heads.net/avatar/${item.name}`}
                                   alt={namePlayer(item.name)}
                                   onError={(e) => (e.target.src = faceDefault)}
                                />
                             </div>
                             <div className="top-hours__card__descr">
                                <div className="top-hours__card__descr__top">
                                   <h3>{namePlayer(item.name)}</h3>
                                   <div>
                                      <p
                                         className="bage"
                                         style={{
                                            background:
                                               i === 0
                                                  ? '#FFC700'
                                                  : i === 1
                                                  ? '#C0C0C0'
                                                  : i === 2
                                                  ? '#9C622C'
                                                  : '#383838',
                                         }}
                                      >
                                         #{i + 1}
                                      </p>
                                   </div>
                                </div>
                                <h5>
                                   Наиграно:{' '}
                                   <span style={{ color: '#fff' }}>
                                      {item.hours}ч.
                                   </span>
                                </h5>
                             </div>
                          </div>
                       ))}
            </div>
         ) : playersContent === 'topBalance' ? (
            <div className="profile-page__players__top-balance">
               {players.length === 0
                  ? null
                  : players
                       .sort((a, b) => a.mcoins - b.mcoins)
                       .reverse()
                       .slice(0, 16)
                       .map((item, i) => (
                          <div className="top-balance__card" key={i}>
                             <div className="top-balance__card__img">
                                <img
                                   src={`https://mc-heads.net/avatar/${item.name}`}
                                   alt={namePlayer(item.name)}
                                   onError={(e) => (e.target.src = faceDefault)}
                                />
                             </div>
                             <div className="top-balance__card__descr">
                                <div className="top-balance__card__descr__top">
                                   <h3>{namePlayer(item.name)}</h3>
                                   <div>
                                      <p
                                         className="bage"
                                         style={{
                                            background:
                                               i === 0
                                                  ? '#FFC700'
                                                  : i === 1
                                                  ? '#C0C0C0'
                                                  : i === 2
                                                  ? '#9C622C'
                                                  : '#383838',
                                         }}
                                      >
                                         #{i + 1}
                                      </p>
                                   </div>
                                </div>
                                <h5>
                                   Баланс:{' '}
                                   <span style={{ color: '#fff' }}>
                                      {getBalance(item.mcoins)}
                                   </span>
                                </h5>
                             </div>
                          </div>
                       ))}
            </div>
         ) : null}
      </div>
   );
};

export default ProfilePlayers;
