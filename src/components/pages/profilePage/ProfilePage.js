import { Helmet } from 'react-helmet';
import { useState } from 'react';

import ProfileProfile from './ProfileProfile';
import ProfileNews from './ProfileNews';
import ProfilePosts from './ProfilePosts';
import ProfilePlayers from './ProfilePlayers';
import ProfileBank from './ProfileBank';

const ProfilePage = ({
   getData,
   changeStatus,
   setChangeStatus,
   headColor,
   setHeadColor,
   changeHeadColor,
   setChangeHeadColor,
   copyText,
   nitro,
   news,
   players,
   defaultCards,
   specialCards,
   setModal,
   modal,
   handleBuyCardClose,
   cardBuyError,
   setCardBuyError,
   isBuy,
   setIsBuy,
   popoverIsBuy,
   setPopoverIsBuy,
   cardId,
   defaultCardsError,
   objPlayers,
   setActivePlayer,
}) => {
   const [activeProfile, setActiveProfile] = useState('profile');

   function returnProfileElem() {
      switch (activeProfile) {
         case 'profile':
            return (
               <ProfileProfile
                  getData={getData}
                  changeStatus={changeStatus}
                  setChangeStatus={setChangeStatus}
                  headColor={headColor}
                  setHeadColor={setHeadColor}
                  changeHeadColor={changeHeadColor}
                  setChangeHeadColor={setChangeHeadColor}
                  copyText={copyText}
                  nitro={nitro}
               />
            );
         case 'news':
            return (
               <ProfileNews getData={getData} copyText={copyText} news={news} />
            );
         case 'posts':
            return <ProfilePosts players={players} />;
         case 'players':
            return (
               <ProfilePlayers
                  players={players}
                  setActivePlayer={setActivePlayer}
               />
            );
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

   return (
      <section className="profile-page mw1400 animate__animated animate__fadeIn">
         <Helmet>
            <title>{'MixLands > Профиль'}</title>
         </Helmet>
         <div className="profile-page__nav-bar">
            <ul>
               <li
                  className={
                     activeProfile === 'profile' ? 'profile-active' : null
                  }
                  onClick={() => setActiveProfile('profile')}
               >
                  Профиль
               </li>
               <li
                  className={activeProfile === 'news' ? 'profile-active' : null}
                  onClick={() => setActiveProfile('news')}
               >
                  Новости
               </li>
               <li
                  className={
                     activeProfile === 'posts' ? 'profile-active' : null
                  }
                  onClick={() => setActiveProfile('posts')}
               >
                  Посты
               </li>
               <li
                  className={
                     activeProfile === 'players' ? 'profile-active' : null
                  }
                  onClick={() => setActiveProfile('players')}
               >
                  Игроки
               </li>
               <li
                  className={activeProfile === 'bank' ? 'profile-active' : null}
                  onClick={() => setActiveProfile('bank')}
               >
                  Банк
               </li>
            </ul>
         </div>
         <div className="profile-page__main">{returnProfileElem()}</div>
      </section>
   );
};

export default ProfilePage;
