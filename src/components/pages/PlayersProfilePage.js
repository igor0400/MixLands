import headDefault from '../../images/head-default.png';

const PlayersProfilePage = ({ player }) => {
   const nitro =
      player.nitro ||
      player.rank === 'Администратор' ||
      player.rank === 'Модератор';
   const posts = [];

   if (player.posts) {
      for (let key in player.posts) {
         posts.push({ ...player.posts[key], id: key });
      }
   }

   const getBalance = (item) =>
      item < 64
         ? `${item} MK`
         : item >= 64
         ? item % 64 === 0
            ? `${Math.floor(item / 64)} CMK`
            : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
         : '0 MK';

   return (
      <div className="players-profile-page animate__animated animate__fadeIn">
         <div className="players-profile-page__profile__info">
            <div className="players-profile-page__profile__info__logo">
               <img
                  style={{
                     background:
                        player.headColor && nitro
                           ? player.headColor
                           : '#1F1C27',
                  }}
                  src={`https://mc-heads.net/head/${player.name}`}
                  alt="head"
                  onError={(e) => (e.target.src = headDefault)}
               />
            </div>
            <div className="players-profile-page__profile__info__descr">
               <p className="name profile-p">{player.name}</p>
               <p className="hours profile-p">
                  <span style={{ color: '#B4B4B4' }}>Наигранные часы:</span>{' '}
                  {player.hours}ч.
               </p>
               <p className="mcoins profile-p">
                  <span style={{ color: '#B4B4B4' }}>Баланс:</span>{' '}
                  {getBalance(player.mcoins)}
               </p>
               <p
                  className="rank profile-p"
                  style={{
                     color:
                        player.rank === 'Модератор'
                           ? '#FFB800'
                           : player.rank === 'Администратор'
                           ? '#FF004D'
                           : '#fff',
                  }}
               >
                  <span style={{ color: '#B4B4B4' }}>Ранг:</span>{' '}
                  {player.rank ? player.rank : 'Игрок'}
               </p>
               <div className="status profile-p">
                  <span style={{ color: '#B4B4B4' }}>Статус:</span>{' '}
                  <p id="user-status__text" className="status__text">
                     {player.status ? player.status : 'Нет статуса'}
                  </p>
               </div>
               <p className="skin profile-p">
                  <span style={{ color: '#B4B4B4' }}>Скин:</span>{' '}
                  <a
                     href={`https://ru.namemc.com/profile/${
                        player ? player.name : null
                     }`}
                  >
                     открыть
                  </a>
               </p>
            </div>
         </div>
         <div className="players-profile-page__profile__posts">
            <div className="players-profile-page__profile__posts__top">
               <h2 className="titleh2">Посты</h2>
            </div>
            {player.posts ? (
               posts.reverse().map((item) => (
                  <div className="user__post" key={item.id}>
                     <div className="title">
                        {player.name} — {item.date}
                     </div>
                     <div className="text">{item.text}</div>
                  </div>
               ))
            ) : (
               <h4 className="posts-null">У игрока пока нет постов.</h4>
            )}
         </div>
      </div>
   );
};

export default PlayersProfilePage;
