import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';
import { getDiscordUserData, refresh } from '../../utils/auth';

const App: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      if (localStorage.getItem('token')) {
         refresh(dispatch);
      }

      const discordOauthData = localStorage.getItem('discordOauthData');

      if (discordOauthData) {
         const oauthData = JSON.parse(discordOauthData);

         getDiscordUserData(oauthData, dispatch);
      }
   }, []);

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
