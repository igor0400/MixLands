import axios from 'axios';
import { FC, useEffect } from 'react';
import { useGetUsersQuery } from '../../slices/usersSlice';

const Users: FC = () => {
   const {
      data: users = [],
      isLoading,
      isError,
      error,
   } = useGetUsersQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
         data,
         isLoading,
         isError,
         error,
      }),
   });

   useEffect(() => {
      if (users.length) console.log(users);
      if (isError) console.log(error);
   }, [users, isError]);

   return (
      <div className="users">
         {users.map((item: any, i: number) => (
            <p key={i}>{item.NICKNAME}</p>
         ))}
      </div>
   );
};

export default Users;
