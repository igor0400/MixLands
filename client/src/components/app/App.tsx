import { FC } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppRoutes from './Routes';

const App: FC = () => {
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
