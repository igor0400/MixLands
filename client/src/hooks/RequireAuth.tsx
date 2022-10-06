import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../slices/userSlice';
import { useLocation, useNavigate } from 'react-router';

import data from '../config.json';

interface Props {
   children: any;
}

const RequireAuth: FC<Props> = ({ children }) => {
   const token = localStorage.getItem('token');
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (token) {
         axios
            .post(`${data.proxy}/auth/refresh`, { token })
            .then((res) => {
               dispatch(userLogin(res.data));
            })
            .catch(() => {
               localStorage.removeItem('token');
               navigate('/login', { state: { from: location } });
            });
      }
   }, []);

   return children;
};

export default RequireAuth;
