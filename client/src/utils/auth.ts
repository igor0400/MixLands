import axios from 'axios';
import { ResponseType } from './types';
import data from '../config.json';
import { userLogin, setLoading, userLogout } from '../slices/userSlice';

const { proxy } = data;

export async function login(nickname: string, password: string) {
   let response: ResponseType = { status: 500, data: '' };

   await axios
      .post(`${proxy}/auth/login`, { nickname, password })
      .then((res) => {
         const body = res.data;
         localStorage.setItem('token', body.token);
         response = { status: 200, data: body.user };
      })
      .catch((err) => {
         response = {
            status: err.response.status,
            data: err.response.data.message,
         };
      });

   return response;
}

export async function refresh(dispatch: Function) {
   dispatch(setLoading(true));

   const token = localStorage.getItem('token');

   await axios
      .get(`${proxy}/auth/refresh`, {
         headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
         dispatch(userLogin(res.data));
      })
      .catch(() => {
         localStorage.removeItem('token');
      })
      .finally(() => dispatch(setLoading(false)));
}

export async function pageRefresh(dispatch: Function) {
   dispatch(setLoading(true));

   const token = localStorage.getItem('token');

   await axios
      .get(`${proxy}/auth/refresh`, {
         headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
         localStorage.removeItem('token');
         dispatch(userLogout());
      })
      .finally(() => dispatch(setLoading(false)));
}
