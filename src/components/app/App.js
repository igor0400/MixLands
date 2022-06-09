import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { database, ref, child, get } from '../../firebase/firebase';

import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import StatsPage from '../pages/StatsPage';
import PlayersProfilePage from '../pages/PlayersProfilePage';
import WikiPage from '../pages/wikiPage/WikiPage';
import ShopPage from '../pages/ShopPage';
import ProfilePage from '../pages/profilePage/ProfilePage';
import NotificationsPage from '../pages/NotificationsPage';
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
      const dbRef = ref(database);

      get(child(dbRef, 'users'))
         .then((snapshot) => {
            if (snapshot.exists()) {
               setPlayersLoading(false);
               const data = [];
               for (let key in snapshot.val()) {
                  data.push(snapshot.val()[key]);
               }
               setPlayers(data);
               setObjPlayers(snapshot.val());

               if (user) {
                  data.forEach((item) => {
                     if (item.name === user.name) {
                        localStorage.setItem('user', JSON.stringify(item));
                     }
                  });
               }
            } else {
               setPlayersLoading(false);
               setPlayersError(true);
            }
         })
         .catch(() => {
            setPlayersLoading(false);
            setPlayersError(true);
         });

      get(child(dbRef, 'cards'))
         .then((snapshot) => {
            if (snapshot.exists()) {
               const defaultData = [];
               const specialData = [];

               for (let key in snapshot.val().default) {
                  defaultData.push(snapshot.val().default[key]);
               }

               for (let key in snapshot.val().special) {
                  specialData.push(snapshot.val().special[key]);
               }

               setDefaultCards(defaultData);
               setSpecialCards(specialData);
            } else {
               setDefaultCardsError(true);
            }
         })
         .catch(() => {
            setDefaultCardsError(true);
         });

      get(child(dbRef, 'cards')).then((snapshot) => {
         if (snapshot.exists()) {
            if (snapshot.val().cardId) setCardId(snapshot.val().cardId);
         } else {
            console.log('No data available');
         }
      });

      get(child(dbRef, 'news')).then((snapshot) => {
         if (snapshot.exists()) {
            const data = [];

            for (let key in snapshot.val()) {
               data.push(snapshot.val()[key]);
            }

            setNews(data);
         } else {
            console.log('No data available');
         }
      });
   };

   useEffect(getData, []);

   const copyText = (text) => {
      const body = document.querySelector('body');
      const input = document.createElement('input');
      body.append(input);
      input.value = text;
      input.select();
      document.execCommand('copy');
      input.remove();

      setCopyAlertActive(true);

      setTimeout(() => {
         setCopyAlertClass('animate__fadeOut');
      }, 2000);
      setTimeout(() => {
         setCopyAlertActive(false);
         setCopyAlertClass('animate__fadeIn');
      }, 3000);
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
                                 setActivePlayer={setActivePlayer}
                              />
                           )
                        }
                     />
                  ) : null}

                  {getUserPage()}

                  <Route path="notifications" element={<NotificationsPage />} />

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
