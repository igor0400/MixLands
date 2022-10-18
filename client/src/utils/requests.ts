import axios from 'axios';
import { proxy } from '../config';
import { getNewToken } from './auth';

const settings = (token: string | null) => ({
   withCredentials: true,
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export const postRequest = async (url: string, data: any) => {
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
export const deleteRequest = async (url: string) => {
   try {
      const token = localStorage.getItem('token');
      const { data: res } = await axios.delete(
         `${proxy}/${url}`,
         settings(token)
      );

      return res;
   } catch (e) {
      const token = await getNewToken();
      const { data: res } = await axios.delete(
         `${proxy}/${url}`,
         settings(token)
      );
      return res;
   }
};
