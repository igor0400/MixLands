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
import WikiPacks from '../pages/wikiPage/WikiPacks';
import ShopPage from '../pages/ShopPage';
import Footer from '../footer/Footer';
import BuyModal from '../modals/BuyModal';

import '../../styles/App.scss';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      case 'packs':
        return <WikiPacks />;
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
            <Route path="/" element={<MainPage handleShow={handleShow} />} />
            <Route path="stats" element={<StatsPage />} />
            <Route
              path="wiki"
              element={
                <WikiPage setActiveWiki={setActiveWiki} activeWiki={activeWiki}>
                  {returnWikiElem()}
                </WikiPage>
              }
            />
            <Route path="shop" element={<ShopPage handleShow={handleShow} />} />
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
          <BuyModal show={show} handleClose={handleClose} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
