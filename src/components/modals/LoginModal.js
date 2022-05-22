import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

function LoginModal({ show, setShow }) {
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
          <CloseButton variant="white" onClick={handleClose} />
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

export default LoginModal;
