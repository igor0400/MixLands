import { userType, onlineUserType, userTypeWithOnline } from './types';
import { servers } from './someSettings';

export function getSlicedNickname(nickname: string): string {
   if (nickname.length > 16) {
      return `${nickname.slice(0, 13)}...`;
   }

   return nickname;
}

const searchEmp = (items: userType[], inputValue: string) => {
   if (inputValue.length === 0) {
      return items;
   }

   return items.filter(
      (item) => item.LOWERCASENICKNAME.indexOf(inputValue.toLowerCase()) > -1
   );
};

const filterUsersByActive = (
   users: userType[],
   filter: string,
   onlineUsers: onlineUserType[]
) => {
   let data: userType[] = [];

   if (filter === 'all') {
      return users;
   }

   if (onlineUsers) {
      const onlineFilteredPlayers: any = [];

      // получание онлайн пользователей
      users.map((item: userType) => {
         onlineUsers.map((player: onlineUserType) => {
            if (item.NICKNAME === player.nickname) {
               onlineFilteredPlayers.push({
                  ...item,
                  online: { server: player.server },
               });
            }
         });
      });

      if (filter === 'online') {
         data = onlineFilteredPlayers;
      }

      servers.forEach((server) => {
         if (filter === server) {
            data = onlineFilteredPlayers.filter(
               (item: userTypeWithOnline) => item?.online?.server === server
            );
         }
      });
   }

   return data;
};

export function getFilteredUsers(
   users: userType[],
   inputValue: string,
   activeFilter: string,
   onlineUsers: onlineUserType[]
): userType[] {
   const visibleData = filterUsersByActive(
      searchEmp(users, inputValue),
      activeFilter,
      onlineUsers
   );

   return visibleData;
   // const sortVisibleData = visibleData.sort((a, b) => b.hours - a.hours); сортировка по часам
}
