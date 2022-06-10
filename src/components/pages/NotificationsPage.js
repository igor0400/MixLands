import { useEffect } from 'react';
import { useState } from 'react';

const NotificationsPage = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [newNotifications, setNewNotifications] = useState([]);
   const [oldNotifications, setOldNotifications] = useState([]);

   useEffect(() => {
      const userNewNotifications = [];
      const userOldNotifications = [];

      if (user) {
         for (let key in user.notifications.new) {
            userNewNotifications.push(user.notifications.new[key]);
         }
         setNewNotifications(userNewNotifications);

         for (let key in user.notifications.old) {
            userOldNotifications.push(user.notifications.old[key]);
         }
         setOldNotifications(userOldNotifications);
      }
   }, []);

   return (
      <div className="notifications-page mw1400 animate__animated animate__fadeIn">
         <h2 className="titleh2">Уведомления</h2>
         {user.notifications ? (
            <>
               {newNotifications.length !== 0 ? (
                  <div className="notifications__new">
                     {newNotifications.map((item, i) => (
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
                        </div>
                     ))}
                  </div>
               ) : null}
               {oldNotifications.length !== 0 ? (
                  <div className="notifications__old">
                     {newNotifications.map((item, i) => (
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
