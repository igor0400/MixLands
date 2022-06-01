import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import Modals from '../modals/Modals';

import '../../styles/App.scss';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [modal, setModal] = useState(false);
  const [activeWiki, setActiveWiki] = useState('rules');
  const [activeProfile, setActiveProfile] = useState('profile');

  const [players, setPlayers] = useState([]);
  const [objPlayers, setObjPlayers] = useState({});
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState(false);

  const [defaultCards, setDefaultCards] = useState([]);
  const [defaultCardsError, setDefaultCardsError] = useState(false);
  const [specialCards, setSpecialCards] = useState([]);

  const [cardBuyError, setCardBuyError] = useState(false);

  const [isBuy, setIsBuy] = useState(false);
  const [popoverIsBuy, setPopoverIsBuy] = useState(false);

  const [cardId, setCardId] = useState(false);

  const userHeadColor = user && user.headColor ? user.headColor : '#1f1c27';

  const [changeStatus, setChangeStatus] = useState(false);
  const [headColor, setHeadColor] = useState(userHeadColor);
  const [changeHeadColor, setChangeHeadColor] = useState(false);

  const [activePlayer, setActivePlayer] = useState({});

  const handleClose = () => setModal(false);
  const handleShowBuy = () => setModal('buy');

  const handleBuyCardClose = () => {
    setModal(false);
    setCardBuyError(false);
    setIsBuy(false);
  };

  const getData = () => {
    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        setPlayersLoading(false);
        const data = [];
        for (let key in res.data) {
          data.push(res.data[key]);
        }
        setPlayers(data);
        setObjPlayers(res.data);

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
  };

  useEffect(getData, []);

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
        return (
          <ProfileProfile
            getData={getData}
            setModal={setModal}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
            headColor={headColor}
            setHeadColor={setHeadColor}
            changeHeadColor={changeHeadColor}
            setChangeHeadColor={setChangeHeadColor}
          />
        );
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
            players={players}
            objPlayers={objPlayers}
          />
        );
    }
  }

  const onClickSomething = (e) => {
    if (e.target.id !== 'change-status' && changeStatus) setChangeStatus(false);

    if (
      e.target.id !== 'change-color-trigger' &&
      e.target.id !== 'head-color-input'
    ) {
      const input = document.querySelector('#head-color-input');

      setChangeHeadColor(false);

      if (user && input && headColor !== user.headColor) {
        input.value = userHeadColor;
        setHeadColor(userHeadColor);
      }
    }
  };

  const getUserPage = () => {
    const url = window.location.href.split('/')[4];
    let player = false;

    players.forEach((item) => {
      if (item.name === url) player = item;
    });

    return (
      <>
        {player ? (
          <Route path={player.name} element={<h1>{player.name}</h1>} />
        ) : null}
      </>
    );
  };

  return (
    <Router>
      <div className="App" onClick={(e) => onClickSomething(e)}>
        <Helmet>
          <title>MixLands</title>
        </Helmet>
        <Header modal={modal} setModal={setModal} />
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
                  setActivePlayer={setActivePlayer}
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
                  playersError || defaultCardsError ? (
                    <Page404 />
                  ) : (
                    <ProfilePage
                      setActiveProfile={setActiveProfile}
                      activeProfile={activeProfile}
                    >
                      {returnProfileElem()}
                    </ProfilePage>
                  )
                }
              />
            ) : null}

            {user && user.name === activePlayer.name ? null : getUserPage()}

            <Route path="*" element={<Page404 />} />
          </Routes>
          <Modals show={modal} handleClose={handleClose} players={players} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
