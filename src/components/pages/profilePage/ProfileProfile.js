const ProfileProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile-page__profile">
      <div className="profile-page__profile__info">
        <div className="profile-page__profile__info__logo">
          <img src={`https://mc-heads.net/head/${user.name}`} />
        </div>
        <div className="profile-page__profile__info__descr">
          <p className="name">{user.name}</p>
          <p className="hours">
            <span style={{ color: '#B4B4B4' }}>Наигранные часы:</span>{' '}
            {user.hours}ч.
          </p>
          <p className="mcoins">
            <span style={{ color: '#B4B4B4' }}>Баланс:</span> {user.mcoins} МК
          </p>
          <p className="rank">
            <span style={{ color: '#B4B4B4' }}>Ранг:</span> {user.rank}
          </p>
          <p className="status">
            <span style={{ color: '#B4B4B4' }}>Статус:</span> {user.status}
          </p>
          <p className="skin">
            <span style={{ color: '#B4B4B4' }}>Скин:</span>{' '}
            <a href="#">открыть</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileProfile;
