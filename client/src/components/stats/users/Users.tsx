import { FC, useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../../slices/usersSlice';
import { getSlicedNickname } from '../../../utils/supportFunctions';
import { userType } from '../../../utils/types';
import { getFilteredUsers } from '../../../utils/supportFunctions';
import { Link } from 'react-router-dom';

import faceDefault from '../../../images/face-default.png';

import './users.scss';

import data from '../../../config.json';
import axios from 'axios';

interface Props {
   inputValue: string;
   activeFilter: string;
}

const { statsServer } = data;

const Users: FC<Props> = ({ inputValue, activeFilter }: Props) => {
   const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);

   useEffect(() => {
      axios.get(`https://api.mcsrvstat.us/2/${statsServer}`).then((res) => {
         if (res.data?.players) {
            setOnlinePlayers(res.data.players?.list);
         }
      });
   }, []);

   const {
      data: users = [],
      isLoading,
      isError,
   } = useGetUsersQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError }) => ({
         data,
         isLoading,
         isError,
      }),
   });

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (isError) {
      return <p>Error</p>;
   }

   const filteredUsers = getFilteredUsers(
      users,
      inputValue,
      activeFilter,
      onlinePlayers
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
                     {onlinePlayers
                        ? onlinePlayers.map((player: string, i: number) =>
                             item.NICKNAME === player ? (
                                <div
                                   className="user__active__circle"
                                   key={i}
                                ></div>
                             ) : null
                          )
                        : null}
                  </div>

                  <div className="pl-4">
                     <h4 className="text-2xl">
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
