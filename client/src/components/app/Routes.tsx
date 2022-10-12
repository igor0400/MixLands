import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector } from 'react-redux';

import Home from '../home/Home';
import Stats from '../stats';
import Wiki from '../wiki';
import Login from '../login/Login';
import Profile from '../profile';
import Page404 from '../errors/Page404';
import RequireAuth from '../../hooks/RequireAuth';

const AppRoutes: FC = () => {
   const { authUser } = useSelector((state: any) => state.user);

   return (
      <Routes>
         <Route index element={<Home />} />
         <Route path="stats" element={<Stats />} />
         <Route path="wiki" element={<Wiki />} />
         <Route
            path="profile"
            element={
               <RequireAuth>
                  <Profile />
               </RequireAuth>
            }
         />
         <Route path="*" element={<Page404 />} />
         {localStorage.getItem('token') || authUser ? null : (
            <Route path="login" element={<Login />} />
         )}
      </Routes>
   );
};

export default AppRoutes;
