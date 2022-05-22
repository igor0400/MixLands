import logo from '../../images/icons/logo.png';
import { NavLink, Link } from 'react-router-dom';
import LoginModal from '../modals/LoginModal';

const Header = ({ buyShow, loginShow, setLoginShow }) => {
  return (
    <header
      className="header"
      style={{ paddingRight: buyShow || loginShow ? '10px' : 0 }}
    >
      <div className="header__wrapper mw1400">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
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
          <LoginModal show={loginShow} setShow={setLoginShow} />
        </div>
      </div>
    </header>
  );
};

export default Header;
