import logo from '../../images/icons/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

const Header = () => {
  return (
    <header className="header">
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
          <LoginModal />
        </div>
      </div>
    </header>
  );
};

function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-blue" onClick={handleShow}>
        Авторизация
      </button>

      <Modal show={show} onHide={handleClose} className="header-modal">
        <Modal.Header>
          <div></div>
          <Modal.Title>Авторизация</Modal.Title>
          <CloseButton variant="white" />
        </Modal.Header>

        <div className="modal-body">
          <label htmlFor="name">Никнейм</label>
          <input type="text" id="name" />
          <label htmlFor="password">Пароль</label>
          <input type="text" id="password" />
        </div>

        <Modal.Footer>
          <button className="btn btn-blue">Войти</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
