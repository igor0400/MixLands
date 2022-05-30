import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

const SkinModal = ({ show, handleClose }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Modal
      show={show === 'skin' ? true : false}
      onHide={handleClose}
      className="default__modal"
    >
      <Modal.Header>
        <div></div>
        <Modal.Title>
          Скин игрока <br /> {user ? user.name : null}
        </Modal.Title>
        <CloseButton variant="white" onClick={handleClose} />
      </Modal.Header>

      <div className="modal-body"></div>

      <Modal.Footer>
        <a
          href={`https://ru.namemc.com/profile/${user ? user.name : null}`}
          className="btn skin-btn"
        >
          Скачать скин
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default SkinModal;
