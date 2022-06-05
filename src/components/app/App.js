import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import StatsPage from '../pages/StatsPage';
import PlayersProfilePage from '../pages/PlayersProfilePage';
import WikiPage from '../pages/wikiPage/WikiPage';
import ShopPage from '../pages/ShopPage';
import ProfilePage from '../pages/profilePage/ProfilePage';
import Footer from '../footer/Footer';
import Page404 from '../pages/Page404';
import Modals from '../modals/Modals';

import '../../styles/App.scss';

function App() {
   const user = JSON.parse(localStorage.getItem('user'));

   const [modal, setModal] = useState(false);

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

   const nitro =
      (user && user.nitro) ||
      (user && user.rank === 'Администратор') ||
      (user && user.rank === 'Модератор');
   const userHeadColor =
      user && user.headColor && nitro ? user.headColor : '#1F1C27';

   const [changeStatus, setChangeStatus] = useState(false);
   const [headColor, setHeadColor] = useState(userHeadColor);
   const [changeHeadColor, setChangeHeadColor] = useState(false);

   const [activePlayer, setActivePlayer] = useState({});

   const [copyAlertActive, setCopyAlertActive] = useState(false);
   const [copyAlertMr, setCopyAlertMr] = useState(false);
   const [copyAlertClass, setCopyAlertClass] = useState('animate__fadeIn');

   const [news, setNews] = useState([]);

   // HEADER

   const [iconClass, setIconCalss] = useState(null);
   const [dropdownClass, setDropdownClass] = useState('animate__fadeInDown');
   const [dropdownActive, setDropdownActive] = useState(false);

   const handleHeaderShow = () => {
      setIconCalss('animated__profile-btn');
      setDropdownClass('animate__fadeInDown');
      setDropdownActive(true);
   };

   const handleHeaderClose = () => {
      setIconCalss(null);
      setDropdownClass('animate__fadeOutUp');
      setTimeout(() => setDropdownActive(false), 500);
   };

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

      axios
         .get('https://mixlands-3696a-default-rtdb.firebaseio.com/news.json')
         .then((res) => {
            const data = [];

            for (let key in res.data) {
               data.push(res.data[key]);
            }

            setNews(data);
         });
   };

   useEffect(getData, []);

   const copyText = (text, marginRight = false) => {
      navigator.clipboard.writeText(text).then(() => {
         setCopyAlertActive(true);
         if (marginRight) setCopyAlertMr(true);

         setTimeout(() => {
            setCopyAlertClass('animate__fadeOut');
         }, 2000);
         setTimeout(() => {
            setCopyAlertActive(false);
            setCopyAlertClass('animate__fadeIn');
         }, 3000);
      });
   };

   const onClickSomething = (e) => {
      if (e.target.id !== 'change-status' && changeStatus)
         setChangeStatus(false);

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

      if (dropdownActive) handleHeaderClose();
   };

   const getUserPage = () => {
      const player = JSON.parse(localStorage.getItem('activePlayer'));

      return (
         <>
            {player ? (
               <Route
                  path={player.name}
                  element={<PlayersProfilePage player={player} />}
               />
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
            <Header
               modal={modal}
               setModal={setModal}
               iconClass={iconClass}
               dropdownClass={dropdownClass}
               dropdownActive={dropdownActive}
               handleHeaderShow={handleHeaderShow}
               handleHeaderClose={handleHeaderClose}
            />
            <main className="main">
               <Routes>
                  <Route
                     path="/"
                     element={
                        <MainPage
                           handleShow={handleShowBuy}
                           copyText={copyText}
                        />
                     }
                  />
                  <Route
                     path="stats"
                     element={
                        <StatsPage
                           players={players}
                           loading={playersLoading}
                           error={playersError}
                           setActivePlayer={setActivePlayer}
                           copyText={copyText}
                        />
                     }
                  />
                  <Route path="wiki" element={<WikiPage />} />
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
                                 getData={getData}
                                 changeStatus={changeStatus}
                                 setChangeStatus={setChangeStatus}
                                 headColor={headColor}
                                 setHeadColor={setHeadColor}
                                 changeHeadColor={changeHeadColor}
                                 setChangeHeadColor={setChangeHeadColor}
                                 copyText={copyText}
                                 nitro={nitro}
                                 news={news}
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
                                 cardId={cardId}
                                 defaultCardsError={defaultCardsError}
                                 players={players}
                                 objPlayers={objPlayers}
                              />
                           )
                        }
                     />
                  ) : null}

                  {user && user.name === activePlayer.name
                     ? null
                     : getUserPage()}

                  <Route path="*" element={<Page404 />} />
               </Routes>
               <Modals
                  show={modal}
                  handleClose={handleClose}
                  players={players}
                  getData={getData}
               />
               {copyAlertActive ? (
                  <div
                     className={`copy-alert animate__animated ${copyAlertClass}`}
                     style={{ marginRight: copyAlertMr ? '-175px' : 0 }}
                  >
                     Скопировано
                  </div>
               ) : null}
            </main>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
