import { UserType, OnlineUserType, UserTypeWithOnline } from './types';
import { servers } from './someSettings';

export function getSlicedNickname(
   nickname: string,
   length: number,
   sliceLingth: number
): string {
   if (nickname.length > length) {
      return `${nickname.slice(0, sliceLingth)}...`;
   }

   return nickname;
}

const searchEmp = (items: UserType[], inputValue: string) => {
   if (inputValue.length === 0) {
      return items;
   }

   return items.filter(
      (item) => item.LOWERCASENICKNAME.indexOf(inputValue.toLowerCase()) > -1
   );
};

const filterUsersByActive = (
   users: UserType[],
   filter: string,
   onlineUsers: OnlineUserType[]
) => {
   let data: UserType[] = [];

   if (filter === 'all') {
      return users;
   }

   if (onlineUsers) {
      const onlineFilteredPlayers: any = [];

      // получание онлайн пользователей
      users.map((item: UserType) => {
         onlineUsers.map((player: OnlineUserType) => {
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
               (item: UserTypeWithOnline) => item?.online?.server === server
            );
         }
      });
   }

   return data;
};

export function getFilteredUsers(
   users: UserType[],
   inputValue: string,
   activeFilter: string,
   onlineUsers: OnlineUserType[]
): UserType[] {
   const visibleData = filterUsersByActive(
      searchEmp(users, inputValue),
      activeFilter,
      onlineUsers
   );

   return [...visibleData].sort((a, b) => a.HOURS - b.HOURS).reverse();
}
