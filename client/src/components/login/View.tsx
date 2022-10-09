import { useState } from 'react';
import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { Spinner, Modal } from 'react-bootstrap';

interface Porps {
   nickname: string;
   changeNicknameValue: ChangeEventHandler<HTMLInputElement>;
   password: string;
   changePasswordValue: ChangeEventHandler<HTMLInputElement>;
   authUser: MouseEventHandler<HTMLButtonElement>;
   loading: boolean;
}

function ChangePassModal() {
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
                  <path
                     d="m5 5 14 14m-14 0 14-14"
                     stroke="#fff"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                  />
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
}

const LoginView: FC<Porps> = ({
   nickname,
   changeNicknameValue,
   password,
   changePasswordValue,
   authUser,
   loading,
}) => {
   return (
      <div className="login fade-animation">
         <div className="bg-ellipse bg-ellipse__orange"></div>
         <div className="login__content rounded-lg mx-auto max-w-lg my-20 py-8 px-12">
            <h4 className="text-center text-xl font-black mb-4">Авторизация</h4>
            <input
               className="w-full p-3 rounded-lg"
               type="text"
               placeholder="Никнейм..."
               value={nickname}
               onChange={changeNicknameValue}
            />
            <div className="gray-line w-20 h-1 rounded-full my-3 flex mx-auto"></div>
            <input
               className="w-full p-3 rounded-lg"
               type="password"
               placeholder="Пароль..."
               value={password}
               onChange={changePasswordValue}
            />
            <div className="flex justify-between mt-4 px-1">
               {loading ? (
                  <button className="w-1/2 p-2.5 accent-btn default-btn">
                     <Spinner animation="border" variant="light" size="sm" />
                  </button>
               ) : (
                  <button
                     onClick={authUser}
                     disabled={loading}
                     className="w-1/2 p-2.5 accent-btn default-btn"
                  >
                     Войти
                  </button>
               )}
               <ChangePassModal />
            </div>

            <div className="orange-line w-4/5 h-0.5 rounded-full mt-10 mb-4 flex mx-auto"></div>

            <p className="text-center text-base font-semibold">
               Для авторизации вам необходимо преобрести проходку, и
               зарегестрироваться на сервере
            </p>
         </div>
      </div>
   );
};

export default LoginView;
