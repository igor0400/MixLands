import { NavLink } from 'react-router-dom';
import logo from '../../images/icons/logo.png';

const Header = ({ modal, setModal }) => {
  return (
    <header className="header" style={{ paddingRight: modal ? '10px' : 0 }}>
      <div className="header__wrapper mw1400">
        <div className="header__logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="header__nav">
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'header-active' : null)}
            >
              <li>Главная</li>
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) => (isActive ? 'header-active' : null)}
            >
              <li>Статистика</li>
            </NavLink>
            <NavLink
              to="/wiki"
              className={({ isActive }) => (isActive ? 'header-active' : null)}
            >
              <li>Вики</li>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'header-active' : null)}
            >
              <li>Магазин</li>
            </NavLink>
          </ul>
        </div>
        <div className="header-btn">
          {localStorage.getItem('user') ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'header-profile__btn profile-active'
                  : 'header-profile__btn'
              }
            >
              <span>Профиль</span>
            </NavLink>
          ) : (
            <button className="btn btn-blue" onClick={() => setModal('login')}>
              Авторизация
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
