import { FC } from 'react';
import { useGetUsersQuery } from '../../../slices/usersSlice';

import './users.scss';

interface userType {
   // написать поля и заменить тип item
}

const Users: FC = () => {
   const {
      data: users = [],
      isLoading,
      isError,
   } = useGetUsersQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
         data,
         isLoading,
         isError,
      }),
   });

   return (
      <div className="users grid">
         {users.map((item: any, i: number) => (
            <div key={i} className="user p-4">
               {i + 1}. {item.NICKNAME}
            </div>
         ))}
      </div>
   );
};

export default Users;
