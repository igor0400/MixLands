import postsPlus from '../../../images/icons/posts-plus.svg';

const ProfileProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const posts = [];

  if (user.posts) {
    for (let post in user.posts) {
      posts.push(user.posts[post]);
    }
  }

  return (
    <div className="profile-page__profile">
      <div className="profile-page__profile__info">
        <div className="profile-page__profile__info__logo">
          <img src={`https://mc-heads.net/head/${user.name}`} alt="head" />
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
            <span style={{ color: '#B4B4B4' }}>Статус:</span> {user.status ? user.status : 'Нет статуса'}
          </p>
          <p className="skin">
            <span style={{ color: '#B4B4B4' }}>Скин:</span>{' '}
            <a href="#">открыть</a>
          </p>
        </div>
      </div>
      <div className="profile-page__profile__posts">
        <div className="profile-page__profile__posts__top">
          <div></div>
          <h2 className="titleh2">Посты</h2>
          <img src={postsPlus} alt="plus" />
        </div>
        {user.posts ? (
          posts.reverse().map((item) => (
            <div className="profile-page__profile__posts__post" key={item.id}>
              <div className="title">
                {user.name} — {item.date}
              </div>
              <div className="text">{item.text}</div>
            </div>
          ))
        ) : (
          <h4 className="posts-null">Пока нет постов <a href="#">написать пост</a></h4>
        )}
      </div>
    </div>
  );
};

export default ProfileProfile;
