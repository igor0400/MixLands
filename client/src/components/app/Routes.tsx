import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector } from 'react-redux';

import Home from '../home/Home';
import Stats from '../stats';
import Wiki from '../wiki';
import Login from '../login/Login';
import ProfileMain from '../profile/main';
import Page404 from '../errors/Page404';
import RequireAuth from '../../hooks/RequireAuth';

const AppRoutes: FC = () => {
   const { authUser, isLoading } = useSelector((state: any) => state.user);

   return (
      <Routes>
         <Route index element={<Home />} />
         <Route path="stats" element={<Stats />} />
         <Route path="wiki" element={<Wiki />} />
         <Route
            path="profile/main"
            element={
               <RequireAuth>
                  <ProfileMain />
               </RequireAuth>
            }
         />
         <Route path="*" element={<Page404 />} />
         
         {localStorage.getItem('token') || authUser || isLoading ? null : (
            <Route path="login" element={<Login />} />
         )}
      </Routes>
   );
};

export default AppRoutes;
