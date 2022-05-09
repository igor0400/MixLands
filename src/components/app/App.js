import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import StatsPage from '../pages/StatsPage';
import WikiPage from '../pages/wikiPage/WikiPage';
import WikiRules from '../pages/wikiPage/WikiRules';
import WikiMechanics from '../pages/wikiPage/WikiMechanics';
import WikiFaq from '../pages/wikiPage/WikiFaq';
import WikiMods from '../pages/wikiPage/WikiMods';
import ShopPage from '../pages/ShopPage';
import Footer from '../footer/Footer';

import '../../styles/App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>MixLands</title>
        </Helmet>
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="wiki">
              <Route
                path="rules"
                element={
                  <WikiPage>
                    <WikiRules />
                  </WikiPage>
                }
              ></Route>
              <Route
                path="mechanics"
                element={
                  <WikiPage>
                    <WikiMechanics />
                  </WikiPage>
                }
              ></Route>
              <Route
                path="faq"
                element={
                  <WikiPage>
                    <WikiFaq />
                  </WikiPage>
                }
              ></Route>
              <Route
                path="mods"
                element={
                  <WikiPage>
                    <WikiMods />
                  </WikiPage>
                }
              ></Route>
            </Route>
            <Route path="shop" element={<ShopPage />} />
            <Route
              path="*"
              element={
                <h2
                  style={{
                    height: '86vh',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '70px',
                  }}
                >
                  404 page
                </h2>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
