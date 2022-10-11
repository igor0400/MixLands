import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { discordLogin } from '../../../slices/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

import './index.scss';

const DiscordAuth: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      window.onload = () => {
         const fragment = new URLSearchParams(window.location.hash.slice(1));
         const [accessToken, tokenType] = [
            fragment.get('access_token'),
            fragment.get('token_type'),
         ];

         console.log(fragment);

         if (!accessToken) {
            toast.error('Ошибка discord авторизации');
         }

         axios
            .get('https://discord.com/api/users/@me', {
               headers: {
                  authorization: `${tokenType} ${accessToken}`,
               },
            })
            .then((result) => result)
            .then((response) => {
               console.log(response);
               dispatch(discordLogin(response));
            })
            .catch(console.error);
      };
   }, []);

   return <div className="discord-auth fade-animation container">Discord auth</div>;
};

export default DiscordAuth;
