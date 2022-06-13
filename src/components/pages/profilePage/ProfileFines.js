import { useEffect, useState } from 'react';
import axios from 'axios';

import { getDateTime, getClearDateTime } from '../../../service/getDate';

const ProfileFines = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [fines, setFines] = useState([]);
   useEffect(() => {
      // axios.post(
      //    'https://mixlands-3696a-default-rtdb.firebaseio.com/users/Swingor/fines.json',
      //    {
      //       descr: 'вход на чужую территорию, развод конфликта',
      //       sum: 64,
      //       owner: 'Ollyse',
      //          date: '21:37 02.06.2022';
      //          clearDate: '20220602213725';
      //    }
      // );

      const finesData = [];

      if (user.fines) {
         for (let key in user.fines) {
            finesData.push(user.fines[key]);
         }
      }

      setFines(finesData);
   }, []);

   return (
      <div className="profile-page__fines animate__animated animate__fadeIn duration05">
         <h2 className="titleh2">Штрафы</h2>

         {fines.length > 0 ? (
            <div className="fines__wrapper">
               {fines.map((item, i) => (
                  <div className="fine" key={i}>
                     <div className="fine__card">
                        <div className="fine__card__date">{item.date}</div>
                        <div className="fine__card__descr">
                           Описание штрафа:{' '}
                           <span className="text-accent">{item.descr}</span>
                        </div>
                        <div className="fine__card__sum">
                           К оплате:{' '}
                           <span className="text-accent">{item.sum}</span>
                        </div>
                        <div className="fine__card__owner">
                           Выдал:{' '}
                           <span className="text-accent">
                              Участник ФБР - {item.owner}
                           </span>
                        </div>
                     </div>
                     <button className="fine_btn">Оплатить</button>
                  </div>
               ))}
            </div>
         ) : (
            <div className="fines-null">Нет штрафов</div>
         )}
      </div>
   );
};

export default ProfileFines;
