import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { refresh } from '../../utils/auth';
import axios from 'axios';
import { proxy } from '../../config';
import { discordLogin } from '../../slices/userSlice';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';

const App: FC = () => {
   const { userData } = useSelector((state: any) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         refresh(dispatch);

         if (userData?.siteData?.is_discord_auth) {
            // ПЕРЕНЕСТИ ЭТО В AUTH
            axios
               .get(
                  `${proxy}/auth/discord/user/${userData.LOWERCASENICKNAME}`,
                  {
                     headers: {
                        Authorization: `Bearer ${token}`,
                     },
                     withCredentials: true
                  }
               )
               .then((res) => {
                  dispatch(discordLogin(res.data));
               })
               .catch(() => {
                  if (userData?.siteData?.is_discord_repeat_auth) {
                     toast.info('Повторите привязку Discord');
                  }
               });
         }
      }
   }, [userData?.siteData?.is_discord_auth]);

   return (
      <div className="App">
         <Header />
         <main>
            <AppRoutes />
            <ToastContainer
               position="bottom-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
            />
         </main>
         <Footer />
      </div>
   );
};

export default App;
