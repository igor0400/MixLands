import { Helmet } from 'react-helmet';

const ProfilePage = (props) => {
  return (
    <section className="profile-page mw1400 animate__animated animate__fadeIn">
      <Helmet>
        <title>{'MixLands > Профиль'}</title>
      </Helmet>
      <div className="profile-page__nav-bar">
        <ul>
          <li
            className={
              props.activeProfile === 'profile' ? 'profile-active' : null
            }
            onClick={() => props.setActiveProfile('profile')}
          >
            Профиль
          </li>
          <li
            className={props.activeProfile === 'news' ? 'profile-active' : null}
            onClick={() => props.setActiveProfile('news')}
          >
            Новости
          </li>
          <li
            className={
              props.activeProfile === 'posts' ? 'profile-active' : null
            }
            onClick={() => props.setActiveProfile('posts')}
          >
            Посты
          </li>
          <li
            className={
              props.activeProfile === 'topPlayers' ? 'profile-active' : null
            }
            onClick={() => props.setActiveProfile('topPlayers')}
          >
            Топ игроков
          </li>
          <li
            className={props.activeProfile === 'bank' ? 'profile-active' : null}
            onClick={() => props.setActiveProfile('bank')}
          >
            Банк
          </li>
        </ul>
      </div>
      <div className="profile-page__main">{props.children}</div>
    </section>
  );
};

export default ProfilePage;
