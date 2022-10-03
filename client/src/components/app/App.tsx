import { FC } from 'react';
import { Routes, Route } from 'react-router';

import Header from '../header/Header';
import Home from '../home/Home';
import Stats from '../stats';
import Wiki from '../wiki';
import Footer from '../footer/Footer';
import Page404 from '../errors/Page404';

const App: FC = () => {
   return (
      <div className="App">
         <Header />
         <main>
            <Routes>
               <Route index element={<Home />} />
               <Route path="stats" element={<Stats />} />
               <Route path="wiki" element={<Wiki />} />
               <Route path="*" element={<Page404 />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
};

export default App;
