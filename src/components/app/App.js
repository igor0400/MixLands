import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

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
  const [activeWiki, setActiveWiki] = useState('rules');

  function returnWikiElem() {
    switch (activeWiki) {
      case 'rules':
        return <WikiRules />;
      case 'mechanics':
        return <WikiMechanics />;
      case 'faq':
        return <WikiFaq />;
      case 'mods':
        return <WikiMods />;
    }
  }

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
            <Route
              path="wiki"
              element={
                <WikiPage setActiveWiki={setActiveWiki} activeWiki={activeWiki}>
                  {returnWikiElem()}
                </WikiPage>
              }
            />
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
