import { useEffect } from 'react';
import { useState } from 'react';
import { database, ref, set } from '../../firebase/firebase';

const NotificationsPage = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [newNotifications, setNewNotifications] = useState([]);
   const [oldNotifications, setOldNotifications] = useState([]);

   useEffect(() => {
      const userNewNotifications = [];
      const userOldNotifications = [];

      if (user.notifications) {
         if (user.notifications.new) {
            for (let key in user.notifications.new) {
               userNewNotifications.push(user.notifications.new[key]);
            }
            setNewNotifications(userNewNotifications);
         }

         if (user.notifications.old) {
            for (let key in user.notifications.old) {
               userOldNotifications.push(user.notifications.old[key]);
            }
            setOldNotifications(userOldNotifications);
         }
      }

      if (user.notifications && user.notifications.new) {
         transferNotifications();
      }
   }, []);

   const transferNotifications = async () => {
      await set(ref(database, `users/${user.name}/notifications/old`), {
         ...user.notifications.old,
         ...user.notifications.new,
      }).then(async () => {
         await set(ref(database, `users/${user.name}/notifications/new`), null);
      });
      console.log('Уведомления поменялись');
   };

   return (
      <div className="notifications-page mw1400 animate__animated animate__fadeIn">
         <h2 className="titleh2">Уведомления</h2>
         {user.notifications ? (
            <>
               {newNotifications.length !== 0 ? (
                  <div className="notifications__new">
                     <div className="notifications__new__title">
                        <div className="line"></div>
                        <h5>Новые</h5>
                        <div className="line"></div>
                     </div>
                     {newNotifications
                        .sort((a, b) => a.clearDate - b.clearDate)
                        .map((item, i) => (
                           <div className="notification" key={i}>
                              <div className="notification__date">
                                 Дата: {item.date}
                              </div>
                              <div className="notification__recipient">
                                 Получатель: {item.recipientCard.owner}
                              </div>
                              <div className="notification__sender">
                                 Отправитель: {item.senderCard.owner}
                              </div>
                              <div className="notification__sum">
                                 Сумма перевода: {item.sum}
                              </div>
                              {item.message ? (
                                 <div className="notification__message">
                                    Сообщение: {item.message}
                                 </div>
                              ) : null}
                           </div>
                        ))}
                  </div>
               ) : null}
               {oldNotifications.length !== 0 ? (
                  <div className="notifications__old">
                     {user.notifications.new ? (
                        <div className="notifications__old__title">
                           <div className="line"></div>
                           <h5>Старые</h5>
                           <div className="line"></div>
                        </div>
                     ) : null}
                     {oldNotifications
                        .sort((a, b) => a.clearDate - b.clearDate)
                        .map((item, i) => (
                           <div className="notification" key={i}>
                              <div className="notification__date">
                                 Дата: {item.date}
                              </div>
                              <div className="notification__recipient">
                                 Получатель: {item.recipientCard.owner}
                              </div>
                              <div className="notification__sender">
                                 Отправитель: {item.senderCard.owner}
                              </div>
                              <div className="notification__sum">
                                 Сумма перевода: {item.sum}
                              </div>
                              {item.message ? (
                                 <div className="notification__message">
                                    Сообщение: {item.message}
                                 </div>
                              ) : null}
                           </div>
                        ))}
                  </div>
               ) : null}
            </>
         ) : (
            <h4 className="notifications-null">Нет уведомлений</h4>
         )}
      </div>
   );
};

export default NotificationsPage;
