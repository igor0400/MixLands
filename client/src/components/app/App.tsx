import { FC } from 'react';
import { Routes, Route } from 'react-router';

import PageAnimation from '../../hoks/Animation';

import Header from '../header/Header';
import Home from '../home/Home';
import Stats from '../stats/Stats';
import Wiki from '../wiki/Wiki';
import Footer from '../footer/Footer';
import Page404 from '../errors/Page404';

import './app.scss';

const App: FC = () => {
   return (
      <div className="App">
         <Header />
         <main>
            <Routes>
               <Route
                  index
                  element={
                     <PageAnimation>
                        <Home />
                     </PageAnimation>
                  }
               />
               <Route
                  path="stats"
                  element={
                     <PageAnimation>
                        <Stats />
                     </PageAnimation>
                  }
               />
               <Route
                  path="wiki"
                  element={
                     <PageAnimation>
                        <Wiki />
                     </PageAnimation>
                  }
               />
               <Route path="*" element={<Page404 />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
};

export default App;
