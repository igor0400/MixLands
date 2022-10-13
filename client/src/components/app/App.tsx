import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { refresh, refreshDiscord } from '../../utils/auth';

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
            refreshDiscord(userData, dispatch);
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
