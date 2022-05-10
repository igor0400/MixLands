import logo from '../../images/icons/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper mw1400">
        <div className="header__logo">
          <img src={logo} alt="logo" />
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
          <button className="btn btn-blue">Авторизация</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
