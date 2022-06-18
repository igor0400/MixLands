import { useState } from 'react';
import { database, ref, set } from '../../firebase/firebase';

import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';

const ChangePassword = ({ show, handleClose, getData }) => {
   const [inputsValue, setInputsValue] = useState({});
   const [inputsError, setInputsError] = useState(false);
   const [postPassProggres, setPostPassProggres] = useState(false);

   const user = JSON.parse(localStorage.getItem('user'));

   const postPass = async () => {
      setInputsError(false);
      if (!inputsValue.oldPass || !inputsValue.newPass) {
         setInputsError('Заполните оба поля');
         return;
      }

      if (inputsValue.oldPass !== user.password) {
         setInputsError('Неверный пароль');
         return;
      }

      if (inputsValue.oldPass === inputsValue.newPass) {
         setInputsError('Пароли совпадают');
         return;
      }

      if (inputsError) return;

      setPostPassProggres('loading');

      await set(
         ref(database, `users/${user.name}/password`),
         inputsValue.newPass
      ).catch(() => {
         setInputsError('Ошибка сервера');
      });

      console.log('done');

      setPostPassProggres('succses');
      setTimeout(() => {
         handleClose();
         getData();
      }, 1500);
      setTimeout(() => setPostPassProggres(false), 2000);
   };

   return (
      <Modal
         show={show === 'changePassword' ? true : false}
         onHide={handleClose}
         className="header-modal"
      >
         <Modal.Header>
            <div></div>
            <Modal.Title>Смена пароля</Modal.Title>
            <CloseButton variant="white" onClick={handleClose} />
         </Modal.Header>

         <div className="modal-body">
            <label htmlFor="name">Старый пароль</label>
            <input
               type="password"
               id="old-pass"
               onChange={(e) => {
                  setInputsValue((state) => ({
                     ...state,
                     oldPass: e.target.value,
                  }));
               }}
               style={
                  inputsError
                     ? { margin: '8px 0', border: '2px solid #FF002E' }
                     : null
               }
            />
            <label htmlFor="password">Новый пароль</label>
            <input
               type="password"
               id="new-pass"
               onChange={(e) => {
                  setInputsValue((state) => ({
                     ...state,
                     newPass: e.target.value,
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
                  style={{
                     color: '#FF002E',
                     margin: '0 0 5px 0',
                     textAlign: 'center',
                  }}
                  className="animate__animated animate__fadeIn duration05"
               >
                  {inputsError}
               </span>
            ) : null}
            {postPassProggres === 'loading' ? (
               <button className="btn btn-blue btn-loading">
                  <Spinner animation="border" variant="primary" size="sm" />
               </button>
            ) : postPassProggres === 'succses' ? (
               <button className="btn btn-succses succses">
                  <div className="animate__animated animate__fadeInLeft">
                     Готово
                  </div>
               </button>
            ) : (
               <button className="btn btn-blue change-pass" onClick={postPass}>
                  Сменить пароль
               </button>
            )}
         </Modal.Footer>
      </Modal>
   );
};

export default ChangePassword;
