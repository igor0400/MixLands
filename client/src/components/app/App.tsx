import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { refresh } from '../../utils/auth';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';

const App: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         refresh(dispatch);
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
