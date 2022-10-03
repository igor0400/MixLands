import { FC } from 'react';
import { useGetUsersQuery } from '../../../slices/usersSlice';
import { useGetOnlineUsersQuery } from '../../../slices/serverInfoSlice';
import { getSlicedNickname } from '../../../utils/supportFunctions';
import { userType, onlineUserType } from '../../../utils/types';
import { getFilteredUsers } from '../../../utils/supportFunctions';

import { Link } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import faceDefault from '../../../images/face-default.png';

import './users.scss';

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

   const {
      data: onlineUsers = [],
      isLoading: isOnlineUsersLoading,
      isError: isOnlineUsersError,
   } = useGetOnlineUsersQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError }) => ({
         data,
         isLoading,
         isError,
      }),
   });

   const isOnlineUsersLoad = activeFilter === 'online' && isOnlineUsersLoading;

   if (isUsersLoading || isOnlineUsersLoad) {
      return (
         <Box className="flex my-10 justify-center">
            <CircularProgress sx={{ color: '#ff8a00' }} />
         </Box>
      );
   }

   if (isUsersError) {
      return <p>Error</p>;
   }

   const filteredUsers = getFilteredUsers(
      users,
      inputValue,
      activeFilter,
      onlineUsers
   );

   if (!filteredUsers.length) {
      return (
         <p className="text-center text-gray-500 text-lg font-medium">
            Игроки не найдены
         </p>
      );
   }

   return (
      <div className="users grid justify-center lg:justify-between">
         {filteredUsers.map((item: userType, i: number) => (
            <Link to={item.NICKNAME} key={i}>
               <div className="user p-4 flex">
                  <div className="relative">
                     <img
                        src={`https://mc-heads.net/avatar/${item.NICKNAME}`}
                        onError={(e: any) => (e.target.src = faceDefault)}
                        alt="avatar"
                        className="w-16 h-16 rounded"
                     />
                     {onlineUsers
                        ? onlineUsers.map((player: onlineUserType, i: number) =>
                             item.NICKNAME === player.nickname ? (
                                <div
                                   className="user__active__circle"
                                   key={i}
                                ></div>
                             ) : null
                          )
                        : null}
                  </div>

                  <div className="pl-4">
                     <h4 className="text-lg">
                        {getSlicedNickname(item.NICKNAME)}
                     </h4>
                     <p>
                        <span className="text-gray-400">Наиграно:</span> 0 ч.
                     </p>
                  </div>
               </div>
            </Link>
         ))}
      </div>
   );
};

export default Users;
