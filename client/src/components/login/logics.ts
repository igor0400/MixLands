import axios from 'axios';
import { ResponseType } from '../../utils/types';
import data from '../../config.json';

export async function login(nickname: string, password: string) {
   let response: ResponseType = { status: 500, data: '' };

   await axios
      .post(`${data.proxy}/auth/login`, { nickname, password })
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
