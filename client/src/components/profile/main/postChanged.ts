import axios from 'axios';
import { proxy } from '../../../config';
import { changeUserSiteInfo } from '../../../slices/userSlice';
import { getNewToken } from '../../../utils/auth';

export const postUserSiteInfo = async (
   nickname: string,
   data: { bio: string; lor: string },
   dispatch: Function
) => {
   try {
      await axios.post(`${proxy}/user-data/change-info/${nickname}`, data, {
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      });

      dispatch(changeUserSiteInfo(data));
   } catch (e) {
      const token = await getNewToken();
      await axios
         .post(`${proxy}/user-data/change-info/${nickname}`, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .catch((e) => console.log(e));
   }
};
