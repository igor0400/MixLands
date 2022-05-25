import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

function BuyModal({ show, handleClose }) {
  return (
    <Modal
      show={show === 'buy' ? true : false}
      onHide={handleClose}
      className="default__modal"
    >
      <Modal.Header>
        <div></div>
        <Modal.Title>Инструкция</Modal.Title>
        <CloseButton variant="white" onClick={handleClose} />
      </Modal.Header>

      <div className="modal-body">
        <ol>
          <li>Заходим в Discord-сервер, нажав на кнопку “Купить”.</li>
          <li>Читаем отзывы, убеждаемся, что сервер реально крутой.</li>
          <li>Пишем администратору сервера - m1xeee, покупаем проходку.</li>
          <li>Играем, вливаемся в коллектив, ищем друзей!</li>
        </ol>
      </div>

      <Modal.Footer>
        <button className="btn btn-blue">Купить</button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuyModal;
