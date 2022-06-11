import { useEffect, useState } from 'react';
import { database, set, ref, child, get } from '../../firebase/firebase';

import Spinner from 'react-bootstrap/Spinner';

const NotificationsPage = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [newNotifications, setNewNotifications] = useState([]);
   const [oldNotifications, setOldNotifications] = useState([]);
   const [removeAllNotifications, setRemoveAllNotifications] = useState(false);
   const [clearNotifyProggres, setClearNotifyProggres] = useState(false);
   const [activeDeleteNotify, setActiveDeleteNotify] = useState(false);
   const [deleteNotifyProggres, setDeleteNotifyProggres] = useState(false);

   useEffect(() => {
      getRenderedNotifications();

      if (user.notifications && user.notifications.new) {
         transferNotifications();
      }
   }, []);

   const getRenderedNotifications = () => {
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

   const deleteNotify = async (item) => {
      let dataNewNotify = [];
      let dataOldNotify = [];

      setDeleteNotifyProggres('loading');

      const dbRef = ref(database);
      await get(child(dbRef, `users/${user.name}/notifications`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               for (let key in snapshot.val().new) {
                  dataNewNotify.push(snapshot.val().new[key]);
               }
               for (let key in snapshot.val().old) {
                  dataOldNotify.push(snapshot.val().old[key]);
               }

               // СДЕЛАТЬ СДЕСЬ УДАЛЕНИЕ УВЕДОМЛЕНИЯ!!!!!!!!!!!!!!!!!!!!!!

               // ПОСЛЕ УДАЛЕНИЯ В THEN СДЕЛАТЬ ЭТО 
                setDeleteNotifyProggres('succses');
                setActiveDeleteNotify(item);
               // ЕСЛИ ОШИБКА В CATCH ЭТО
               setDeleteNotifyProggres('error');

            } else {
               console.log('No data available');
            }
         })
         .catch(() => {
            setDeleteNotifyProggres('error');
         })
         .finally(() => setTimeout(() => setDeleteNotifyProggres(false), 500));

      console.log(dataNewNotify);
      console.log(dataOldNotify);
   };

   const getBalance = (item) =>
      item < 64
         ? `${item} MK`
         : item >= 64
         ? item % 64 === 0
            ? `${Math.floor(item / 64)} CMK`
            : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
         : '0 MK';

   const notifyRenderCondition =
      newNotifications.length !== 0 || oldNotifications.length !== 0;

   return (
      <div className="notifications-page mw1400 animate__animated animate__fadeIn">
         <h2 className="titleh2">Уведомления</h2>
         {newNotifications.length === 0 && oldNotifications.length === 0 ? (
            <div></div>
         ) : (
            <div className="notifications__clear">
               {clearNotifyProggres === 'loading' ? (
                  <button>
                     <Spinner animation="border" variant="light" size="sm" />
                  </button>
               ) : clearNotifyProggres === 'error' ? (
                  <button>Ошибка</button>
               ) : (
                  <button onClick={clearNotifications}>Очистить всё</button>
               )}
            </div>
         )}

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
                                 removeAllNotifications ||
                                 activeDeleteNotify.clearDate === item.clearDate
                                    ? 'notification animate__animated animate__zoomOut'
                                    : 'notification'
                              }
                              key={i}
                           >
                              <button
                                 className="notification__delete"
                                 onClick={() => deleteNotify(item)}
                              >
                                 Удалить
                              </button>
                              <div className="notification__date">
                                 {item.date}
                              </div>
                              <div className="notification__recipient-card text-accent">
                                 Пополнение карты ML-
                                 {item.recipientCard.id}
                              </div>
                              <div className="notification__sender">
                                 От:{' '}
                                 <span className="text-accent">
                                    {item.senderCard.owner}
                                 </span>
                              </div>
                              <div className="notification__sum">
                                 Сумма:{' '}
                                 <span className="text-accent">
                                    {getBalance(item.sum)}
                                 </span>
                              </div>
                              {item.message ? (
                                 <div className="notification__message">
                                    Комментарий:{' '}
                                    <span className="text-accent">
                                       {item.message}
                                    </span>
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
                                 removeAllNotifications ||
                                 activeDeleteNotify.clearDate === item.clearDate
                                    ? 'notification animate__animated animate__zoomOut'
                                    : 'notification'
                              }
                              key={i}
                           >
                              <button
                                 className="notification__delete"
                                 onClick={() => deleteNotify(item)}
                              >
                                 Удалить
                              </button>
                              <div className="notification__date">
                                 {item.date}
                              </div>
                              <div className="notification__recipient-card text-accent">
                                 Пополнение карты ML-
                                 {item.recipientCard.id}
                              </div>
                              <div className="notification__sender">
                                 От:{' '}
                                 <span className="text-accent">
                                    {item.senderCard.owner}
                                 </span>
                              </div>
                              <div className="notification__sum">
                                 Сумма:{' '}
                                 <span className="text-accent">
                                    {getBalance(item.sum)}
                                 </span>
                              </div>
                              {item.message ? (
                                 <div className="notification__message">
                                    Комментарий:{' '}
                                    <span className="text-accent">
                                       {item.message}
                                    </span>
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
