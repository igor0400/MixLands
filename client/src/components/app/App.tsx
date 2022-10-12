import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';
import { refresh } from '../../utils/auth';

const App: FC = () => {
   const { is_discord_auth } = useSelector(
      (state: any) => state.user.userData.siteData
   );
   const dispatch = useDispatch();

   useEffect(() => {
      if (localStorage.getItem('token')) {
         refresh(dispatch);
      }

      if (is_discord_auth) {
        
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
