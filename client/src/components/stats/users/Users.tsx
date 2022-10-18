import { FC } from 'react';
import { useGetUsersQuery } from '../../../slices/usersSlice';
import { useGetOnlineUsersQuery } from '../../../slices/serverInfoSlice';
import { UserType, OnlineUserType } from '../../../utils/types';
import { getFilteredUsers } from '../../../utils/supportFunctions';

import { CircularProgress, Box } from '@mui/material';

import './users.scss';
import UserCard from './UserCard';

interface Props {
   inputValue: string;
   activeFilter: string;
}

const Users: FC<Props> = ({ inputValue, activeFilter }: Props) => {
   const {
      data: users = [],
      isLoading: isUsersLoading,
      isError: isUsersError,
   } = useGetUsersQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError }) => ({
         data,
         isLoading,
         isError,
      }),
   });

   const { data: onlineUsers = [], isLoading: isOnlineUsersLoading } =
      useGetOnlineUsersQuery(undefined, {
         selectFromResult: ({ data, isLoading }) => ({
            data,
            isLoading,
         }),
      });

   if (isUsersLoading || isOnlineUsersLoading) {
      return (
         <Box className="flex my-10 justify-center">
            <CircularProgress sx={{ color: '#ff8a00' }} />
         </Box>
      );
   }

   if (isUsersError) {
      return (
         <p className="text-center text-xl font-medium my-10 text-gray-400">
            Ошибка :(
         </p>
      );
   }

   const filteredUsers = getFilteredUsers(
      users,
      inputValue,
      activeFilter,
      onlineUsers
   );

   if (!filteredUsers.length) {
      return (
         <p className="text-center text-gray-500 text-lg font-medium mt-10 mb-32">
            Игроки не найдены
         </p>
      );
   }

   return (
      <div className="users grid justify-center lg:justify-between">
         {filteredUsers.map((user: UserType, i: number) => (
            <UserCard user={user} onlineUsers={onlineUsers} key={i} />
         ))}
      </div>
   );
};

export default Users;
