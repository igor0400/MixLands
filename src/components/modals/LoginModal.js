import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState } from 'react';

function LoginModal({ show, handleClose, players }) {
   const [inputsValue, setInputsValue] = useState({});
   const [inputsError, setInputsError] = useState(false);

   return (
      <Modal
         show={show === 'login' ? true : false}
         onHide={() => {
            handleClose();
            setInputsError(false);
         }}
         className="header-modal"
      >
         <Modal.Header>
            <div></div>
            <Modal.Title>Авторизация</Modal.Title>
            <CloseButton
               variant="white"
               onClick={() => {
                  handleClose();
                  setInputsError(false);
               }}
            />
         </Modal.Header>

         <div className="modal-body">
            <label htmlFor="name">Никнейм</label>
            <input
               type="text"
               id="name"
               onChange={(e) => {
                  setInputsValue((state) => ({
                     ...state,
                     name: e.target.value,
                  }));
               }}
               style={
                  inputsError
                     ? { margin: '8px 0', border: '2px solid #FF002E' }
                     : null
               }
            />
            <label htmlFor="password">Пароль</label>
            <input
               type="password"
               id="password"
               onChange={(e) => {
                  setInputsValue((state) => ({
                     ...state,
                     password: e.target.value,
                  }));
               }}
               style={
                  inputsError
                     ? { margin: '8px 0', border: '2px solid #FF002E' }
                     : null
               }
            />
         </div>

         <Modal.Footer>
            {inputsError ? (
               <span
                  style={{ color: '#FF002E', margin: '0 0 5px 0' }}
                  className="animate__animated animate__fadeIn duration05"
               >
                  Неверный никнейм или пароль
               </span>
            ) : null}
            <button
               className="btn btn-blue"
               onClick={() => {
                  players.every((item) => {
                     if (
                        inputsValue.name === item.name &&
                        inputsValue.password === `${item.password}`
                     ) {
                        setInputsError(false);
                        handleClose();
                        localStorage.setItem('user', JSON.stringify(item));
                        return false;
                     } else {
                        setInputsError(true);
                        return true;
                     }
                  });
               }}
            >
               Войти
            </button>
         </Modal.Footer>
      </Modal>
   );
}

export default LoginModal;
