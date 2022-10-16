import { useState } from 'react';
import { FC } from 'react';
import { Modal } from 'react-bootstrap';

const ChangePassModal: FC = () => {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <button className="w-1/2 p-2.5" onClick={handleShow}>
            Забыли пароль?
         </button>

         <Modal
            show={show}
            onHide={handleClose}
            className="change-pass-modal w-screen"
         >
            <Modal.Header>
               <h4 className="text-center font-black text-lg">
                  Забыли пароль?
               </h4>
               <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClose}
               >
                  <path d="m5 5 14 14m-14 0 14-14" />
               </svg>
            </Modal.Header>
            <Modal.Body>
               <p>
                  В том случае, если вы забыли пароль - смените его через
                  телеграмм или дискорд бота, к которому вы привязывали свой
                  аккаунт.
               </p>
               <p>
                  Если вы не подключали защиту через бота - обратитесь за
                  помощью к администрации сервера.
               </p>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ChangePassModal;
