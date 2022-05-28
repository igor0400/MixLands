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
import ProfileBank from '../pages/profilePage/ProfileBank';
import Footer from '../footer/Footer';
import Page404 from '../pages/Page404';
import BuyModal from '../modals/BuyModal';

import '../../styles/App.scss';

function App() {
  const [modal, setModal] = useState(false);
  const [activeWiki, setActiveWiki] = useState('rules');
  const [activeProfile, setActiveProfile] = useState('profile');

  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState(false);

  const [defaultCards, setDefaultCards] = useState([]);
  const [defaultCardsError, setDefaultCardsError] = useState(false);
  const [specialCards, setSpecialCards] = useState([]);

  const [cardBuyError, setCardBuyError] = useState(false);

  const [isBuy, setIsBuy] = useState(false);
  const [popoverIsBuy, setPopoverIsBuy] = useState(false);

  const [cardId, setCardId] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => setModal(false);
  const handleShowBuy = () => setModal('buy');

  const handleBuyCardClose = () => {
    setModal(false);
    setCardBuyError(false);
    setIsBuy(false);
  };

  useEffect(getData, []);

  function getData() {
    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        setPlayersLoading(false);
        const data = [];
        for (let key in res.data) {
          data.push(res.data[key]);
        }
        setPlayers(data);

        if (user) {
          data.forEach((item) => {
            if (item.name === user.name) {
              localStorage.setItem('user', JSON.stringify(item));
            }
          });
        }
      })
      .catch(() => {
        setPlayersLoading(false);
        setPlayersError(true);
      });

    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/cards.json')
      .then((res) => {
        const defaultData = [];
        const specialData = [];

        for (let key in res.data.default) {
          defaultData.push(res.data.default[key]);
        }

        for (let key in res.data.special) {
          specialData.push(res.data.special[key]);
        }

        setDefaultCards(defaultData);
        setSpecialCards(specialData);
      })
      .catch((error) => {
        setDefaultCardsError(error);
      });

    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/cards.json')
      .then((res) => {
        if (res.data.cardId) setCardId(res.data.cardId);
      });
  }

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
        return <ProfileProfile getData={getData} />;
      case 'news':
        return <h1>news</h1>;
      case 'topPlayers':
        return <h1>topPlayers</h1>;
      case 'bank':
        return (
          <ProfileBank
            defaultCards={defaultCards}
            specialCards={specialCards}
            setModal={setModal}
            modal={modal}
            handleClose={handleBuyCardClose}
            cardBuyError={cardBuyError}
            setCardBuyError={setCardBuyError}
            isBuy={isBuy}
            setIsBuy={setIsBuy}
            popoverIsBuy={popoverIsBuy}
            setPopoverIsBuy={setPopoverIsBuy}
            getData={getData}
            cardId={cardId}
            defaultCardsError={defaultCardsError}
          />
        );
    }
  }

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>MixLands</title>
        </Helmet>
        <Header modal={modal} setModal={setModal} players={players} />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage handleShow={handleShowBuy} />} />
            <Route
              path="stats"
              element={
                <StatsPage
                  players={players}
                  loading={playersLoading}
                  error={playersError}
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
            <Route
              path="shop"
              element={<ShopPage handleShow={handleShowBuy} />}
            />
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
          <BuyModal show={modal} handleClose={handleClose} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
