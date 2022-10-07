import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';
import { refresh } from '../../utils/auth';

const App: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      if (localStorage.getItem('token')) {
         refresh(dispatch);
      }
   }, []);

   return (
      <div className="App">
         <Header />
         <main>
            <AppRoutes />
         </main>
         <Footer />
      </div>
   );
};

export default App;
