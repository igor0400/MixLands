import { useEffect, useState } from 'react';
import axios from 'axios';
import { database, ref, set, dbLink } from '../../../firebase/firebase';

import { getDateTime, getClearDateTime } from '../../../service/getDate';
import PayFineModal from '../../modals/PayFineModal';
import { getBalance } from '../../../service/getBalance';

const ProfileFines = ({
   specialCards,
   defaultCards,
   setModal,
   isBuy,
   setIsBuy,
   handleClose,
   modal,
   getData,
}) => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [fines, setFines] = useState([]);
   const [payFineError, setPayFineError] = useState(false);
   const [activeFine, setActiveFine] = useState(false);
   const [activeFineDelete, setActiveFineDelete] = useState(false);

   useEffect(() => {
      // axios.post(
      //    '${dbLink}/users/Swingor/fines.json',
      //    {
      //       descr: 'вход на чужую территорию, развод конфликта',
      //       sum: 64,
      //       owner: 'Ollyse',
      //       date: '21:33 02.06.2022',
      //       clearDate: '20220602213363'
      //    }
      // );

      const finesData = [];

      if (user.fines) {
         for (let key in user.fines) {
            finesData.push({ ...user.fines[key], id: key });
         }
      }

      setFines(finesData);
   }, []);

   const payFine = (userCard) => {
      const sum = activeFine.sum;

      setPayFineError(false);

      if (userCard && +userCard.balance < +sum) {
         setPayFineError('Недостаточно средств на выбранной карте');
         return;
      }

      if (payFineError) return;

      setIsBuy('loading');

      set(ref(database, `users/${user.name}/mcoins`), +user.mcoins - +sum)
         .then(() => {
            set(
               ref(database, `users/${user.name}/cards/${userCard.id}/balance`),
               userCard.balance - +sum
            )
               .then(() => {
                  set(
                     ref(database, `users/${user.name}/fines/${activeFine.id}`),
                     null
                  )
                     .then(() => {
                        setIsBuy('succses');
                        setTimeout(async () => {
                           handleClose();
                           await getData();
                        }, 1500);
                        setTimeout(() => {
                           setIsBuy(false);
                           setActiveFineDelete(activeFine);

                           const copyUser = JSON.parse(JSON.stringify(user));

                           delete copyUser.fines[activeFine.id];

                           localStorage.setItem(
                              'user',
                              JSON.stringify(copyUser)
                           );
                        }, 1800);
                        setTimeout(() => {
                           setFines((state) =>
                              state.filter((item) => item.id !== activeFine.id)
                           );
                           setActiveFineDelete(false);
                        }, 2200);
                     })
                     .catch(() => setIsBuy('error'));
               })
               .catch(() => setIsBuy('error'));
         })
         .catch(() => setIsBuy('error'));
   };

   return (
      <div className="profile-page__fines animate__animated animate__fadeIn duration05">
         <h2 className="titleh2">Штрафы</h2>

         {fines.length > 0 ? (
            <div className="fines__wrapper">
               {fines
                  .sort((a, b) => a.clearDate - b.clearDate)
                  .reverse()
                  .map((item, i) => (
                     <div
                        className={
                           activeFineDelete.id === item.id
                              ? 'fine animate__animated animate__zoomOut'
                              : 'fine'
                        }
                        key={i}
                     >
                        <div className="fine__card">
                           <p className="fine__card__date">{item.date}</p>
                           <p className="fine__card__descr">
                              Описание штрафа:{' '}
                              <span className="text-accent">{item.descr}</span>
                           </p>
                           <p className="fine__card__sum">
                              К оплате:{' '}
                              <span className="text-accent">
                                 {getBalance(item.sum)}
                              </span>
                           </p>
                           <p className="fine__card__owner">
                              Выдал:{' '}
                              <span className="text-accent">
                                 Участник ФБР - {item.owner}
                              </span>
                           </p>
                        </div>
                        <button
                           className="fine__btn btn"
                           onClick={() => {
                              setModal('payFine');
                              setActiveFine(item);
                           }}
                        >
                           Оплатить
                        </button>
                     </div>
                  ))}
            </div>
         ) : (
            <h4 className="fines-null">Нет штрафов</h4>
         )}
         <PayFineModal
            show={modal}
            handleClose={handleClose}
            defaultCards={defaultCards}
            specialCards={specialCards}
            setModal={setModal}
            modal={modal}
            isBuy={isBuy}
            setIsBuy={setIsBuy}
            payFine={payFine}
            payFineError={payFineError}
            setPayFineError={setPayFineError}
            setActiveFine={setActiveFine}
         />
      </div>
   );
};

export default ProfileFines;
