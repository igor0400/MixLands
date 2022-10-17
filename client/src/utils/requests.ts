import axios from 'axios';
import { proxy } from '../config';
import { getNewToken } from './auth';

export const postRequest = async (url: string, data: any) => {
   const settings = (token: string | null) => ({
      withCredentials: true,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   try {
      const token = localStorage.getItem('token');
      const { data: res } = await axios.post(
         `${proxy}/${url}`,
         data,
         settings(token)
      );

      return res;
   } catch (e) {
      const token = await getNewToken();
      const { data: res } = await axios.post(
         `${proxy}/${url}`,
         data,
         settings(token)
      );
      return res;
   }
};
