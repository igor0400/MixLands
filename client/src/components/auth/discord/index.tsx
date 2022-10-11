import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { discordLogin } from '../../../slices/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

import './index.scss';
import {
   discordAuthLink,
   DSClient_id,
   DSClient_secret,
   DSServer_name,
   proxy,
   siteLink,
} from '../../../config';
import { getDiscordUserData } from '../../../utils/auth';

const DiscordAuth: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      window.onload = async () => {
         const code = window.location.search.slice(6);

         try {
            if (code) {
               const params = new URLSearchParams();
               params.append('client_id', DSClient_id);
               params.append('client_secret', DSClient_secret);
               params.append('grant_type', 'authorization_code');
               params.append('code', code);
               params.append('redirect_uri', `${siteLink}/#/auth/discord`);
               params.append('scope', 'identify');

               const response = await fetch(
                  'https://discord.com/api/oauth2/token',
                  {
                     method: 'POST',
                     body: params,
                     headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                     },
                  }
               );

               const oauthData = await response.json();

               localStorage.setItem(
                  'discordOauthData',
                  JSON.stringify(oauthData)
               );
               getDiscordUserData(oauthData, dispatch);
               window.location.assign(`${siteLink}/#/profile`);
            }
         } catch (e) {
            console.error(e);
            toast.error('Ошибка discord авторизации, попробуйте еще раз');
         }
      };
   }, []);

   return (
      <div className="discord-auth fade-animation flex flex-column justify-center">
         <h3>Авторизация Discord</h3>
         <a href={discordAuthLink}>Авторизироваться</a>
      </div>
   );
};

export default DiscordAuth;
