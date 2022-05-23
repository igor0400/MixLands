import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
import ProfilePage from '../pages/profilePage/ProfilePage';
import ProfileProfile from '../pages/profilePage/ProfileProfile';
import Footer from '../footer/Footer';
import Page404 from '../pages/Page404';
import BuyModal from '../modals/BuyModal';

import '../../styles/App.scss';

function App() {
  const [buyShow, setBuyShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [activeWiki, setActiveWiki] = useState('rules');
  const [activeProfile, setActiveProfile] = useState('profile');
  const [admins, setAdmins] = useState(['Swingor', 'm1xeee']);
  const [moders, setModers] = useState(['Ollyse', 'ayori_chan']);

  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState(false);

  const handleClose = () => setBuyShow(false);
  const handleShow = () => setBuyShow(true);

  useEffect(() => {
    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        setPlayersLoading(false);
        const data = [];
        for (let key in res.data) {
          data.push(res.data[key]);
        }
        setPlayers(data);
      })
      .catch(() => {
        setPlayersLoading(false);
        setPlayersError(true);
      });
  }, []);

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

  function returnProfileElem() {
    switch (activeProfile) {
      case 'profile':
        return <ProfileProfile />;
      case 'news':
        return <h1>news</h1>;
      case 'topPlayers':
        return <h1>topPlayers</h1>;
      case 'bank':
        return <h1>bank</h1>;
    }
  }

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>MixLands</title>
        </Helmet>
        <Header
          buyShow={buyShow}
          loginShow={loginShow}
          setLoginShow={setLoginShow}
          players={players}
        />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<MainPage handleShow={handleShow} />} />
            <Route
              path="stats"
              element={
                <StatsPage
                  players={players}
                  loading={playersLoading}
                  error={playersError}
                  admins={admins}
                  moders={moders}
                />
              }
            />
            <Route
              path="wiki"
              element={
                <WikiPage setActiveWiki={setActiveWiki} activeWiki={activeWiki}>
                  {returnWikiElem()}
                </WikiPage>
              }
            />
            <Route path="shop" element={<ShopPage handleShow={handleShow} />} />
            {localStorage.getItem('user') ? (
              <Route
                path="profile"
                element={
                  <ProfilePage
                    setActiveProfile={setActiveProfile}
                    activeProfile={activeProfile}
                  >
                    {returnProfileElem()}
                  </ProfilePage>
                }
              />
            ) : null}

            <Route path="*" element={<Page404 />} />
          </Routes>
          <BuyModal show={buyShow} handleClose={handleClose} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
