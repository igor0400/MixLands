import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/icons/logo.png';

const Header = ({ modal, setModal }) => {
  const [iconClass, setIconCalss] = useState(null);
  const [dropdownClass, setDropdownClass] = useState('animate__fadeInDown');
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleShow = () => {
    setIconCalss('animated__profile-btn');
    setDropdownClass('animate__fadeInDown');
    setDropdownActive(true);
  };

  const handleClose = () => {
    setIconCalss(null);
    setDropdownClass('animate__fadeOutUp');
    setTimeout(() => setDropdownActive(false), 500);
  };

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
            <div className="profile-btn">
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
              <div className="dropdown">
                <svg
                  className={iconClass}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    dropdownActive ? handleClose() : handleShow();
                  }}
                >
                  <path d="M15 12L9 6L3 12" />
                </svg>
                {dropdownActive ? (
                  <div
                    className={`dropdown__item animate__animated ${dropdownClass}`}
                  >
                    <Link to="/profile">
                      <p className="go-profile" onClick={handleClose}>
                        Перейти в профиль
                      </p>
                    </Link>
                    <p className="chps" onClick={handleClose}>
                      Сменить пароль
                    </p>
                    <Link to="/">
                      <p
                        className="out"
                        onClick={() => {
                          localStorage.removeItem('user');
                          handleClose();
                        }}
                      >
                        Выйти
                      </p>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
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
