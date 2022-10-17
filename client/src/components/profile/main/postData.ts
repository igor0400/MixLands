import { toast } from 'react-toastify';
import { addUserPost, changeUserSiteInfo } from '../../../slices/userSlice';
import { postRequest } from '../../../utils/requests';

export const postUserSiteInfo = async (
   nickname: string,
   data: { bio: string; lor: string },
   dispatch: Function
) => {
   try {
      await postRequest(`user-data/change-info/${nickname}`, data);
      toast.success('Изменения сохранены');
      dispatch(changeUserSiteInfo(data));
   } catch (e) {
      console.log(e);
      toast.error('Ошибка, попробуйте позже');
   }
};

export const sendPost = async (
   nickname: string,
   data: any,
   dispatch: Function
) => {
   try {
      const res = await postRequest(`posts/${nickname}`, data);
      dispatch(addUserPost(res));
   } catch (e: any) {
      console.log(e);
      toast.error(e?.message || 'Ошибка, попробуйте позже');
   }
};
