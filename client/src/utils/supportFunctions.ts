import { userType, onlineUserType } from './types';

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
   const data: userType[] = [];

   switch (filter) {
      case 'online':
         if (onlineUsers) {
            users.map((item) => {
               onlineUsers.map((player: onlineUserType) => {
                  if (item.NICKNAME === player.nickname) {
                     data.push(item);
                  }
               });
            });
         }
         return data;
      default:
         return users;
   }
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