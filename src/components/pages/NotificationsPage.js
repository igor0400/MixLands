import { useEffect, useState } from 'react';
import { database, set, ref } from '../../firebase/firebase';

import Spinner from 'react-bootstrap/Spinner';

const NotificationsPage = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [newNotifications, setNewNotifications] = useState([]);
   const [oldNotifications, setOldNotifications] = useState([]);
   const [removeAllNotifications, setRemoveAllNotifications] = useState(false);
   const [clearNotifyProggres, setClearNotifyProggres] = useState(false);

   useEffect(() => {
      getNotifications();

      if (user.notifications && user.notifications.new) {
         transferNotifications();
      }
   }, []);

   const getNotifications = () => {
      const normalUser = JSON.parse(localStorage.getItem('user'));
      const userNewNotifications = [];
      const userOldNotifications = [];

      if (normalUser.notifications) {
         if (normalUser.notifications.new) {
            for (let key in normalUser.notifications.new) {
               userNewNotifications.push({
                  ...normalUser.notifications.new[key],
                  id: key,
               });
            }
            setNewNotifications(userNewNotifications);
         }

         if (normalUser.notifications.old) {
            for (let key in normalUser.notifications.old) {
               userOldNotifications.push({
                  ...normalUser.notifications.old[key],
                  id: key,
               });
            }
            setOldNotifications(userOldNotifications);
         }
      }
   };

   const transferNotifications = async () => {
      await set(ref(database, `users/${user.name}/notifications/old`), {
         ...user.notifications.old,
         ...user.notifications.new,
      }).then(async () => {
         await set(ref(database, `users/${user.name}/notifications/new`), null);
         await localStorage.setItem(
            'user',
            JSON.stringify({
               ...user,
               notifications: {
                  old: {
                     ...user.notifications.old,
                     ...user.notifications.new,
                  },
               },
            })
         );
      });
   };

   const clearNotifications = async () => {
      const userData = JSON.parse(JSON.stringify(user));

      setClearNotifyProggres('loading');

      await set(ref(database, `users/${user.name}/notifications`), null)
         .then(() => {
            delete userData.notifications;

            setClearNotifyProggres('succses');
            setRemoveAllNotifications(true);

            setTimeout(() => {
               localStorage.setItem('user', JSON.stringify(userData));
               setNewNotifications([]);
               setOldNotifications([]);
            }, 400);
         })
         .catch(() => setClearNotifyProggres('error'));
   };

   const notifyRenderCondition = newNotifications.length !== 0 || oldNotifications.length !== 0

   return (
      <div className="notifications-page mw1400 animate__animated animate__fadeIn">
         <div className="notifications-page__top">
            <div></div>
            <h2 className="titleh2">Уведомления</h2>
            {newNotifications.length === 0 && oldNotifications.length === 0 ? (
               <div></div>
            ) : (
               <>
                  {clearNotifyProggres === 'loading' ? (
                     <button className="notifacations__clear">
                        <Spinner animation="border" variant="light" size="sm" />
                     </button>
                  ) : clearNotifyProggres === 'error' ? (
                     <button className="notifacations__clear">Ошибка</button>
                  ) : (
                     <button
                        className="notifacations__clear"
                        onClick={clearNotifications}
                     >
                        Очистить всё
                     </button>
                  )}
               </>
            )}
         </div>

         {user.notifications && notifyRenderCondition ? (
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
                        .reverse()
                        .map((item, i) => (
                           <div
                              className={
                                 removeAllNotifications
                                    ? 'notification animate__animated animate__zoomOut'
                                    : 'notification'
                              }
                              key={i}
                           >
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
                     {oldNotifications
                        .sort((a, b) => a.clearDate - b.clearDate)
                        .reverse()
                        .map((item, i) => (
                           <div
                              className={
                                 removeAllNotifications
                                    ? 'notification animate__animated animate__zoomOut'
                                    : 'notification'
                              }
                              key={i}
                           >
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
