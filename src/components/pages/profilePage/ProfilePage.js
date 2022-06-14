import { useState } from 'react';

import ProfileProfile from './ProfileProfile';
import ProfileNews from './ProfileNews';
import ProfilePosts from './ProfilePosts';
import ProfilePlayers from './ProfilePlayers';
import ProfileBank from './ProfileBank';
import ProfileFines from './ProfileFines';

const ProfilePage = ({
   getData,
   changeStatus,
   setChangeStatus,
   headColor,
   setHeadColor,
   changeHeadColor,
   setChangeHeadColor,
   nitro,
   news,
   players,
   defaultCards,
   specialCards,
   setModal,
   modal,
   handleClose,
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
                  nitro={nitro}
               />
            );
         case 'news':
            return <ProfileNews getData={getData} news={news} />;
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
                  handleClose={handleClose}
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
         case 'fines':
            return (
               <ProfileFines
                  defaultCards={defaultCards}
                  defaultCardsError={defaultCardsError}
                  specialCards={specialCards}
                  setModal={setModal}
                  modal={modal}
                  handleClose={handleClose}
                  isBuy={isBuy}
                  setIsBuy={setIsBuy}
               />
            );
      }
   }

   return (
      <section className="profile-page mw1400 animate__animated animate__fadeIn">
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
               {/* <li
                  className={
                     activeProfile === 'fines' ? 'profile-active' : null
                  }
                  onClick={() => setActiveProfile('fines')}
               >
                  Штрафы
               </li> */}
            </ul>
         </div>
         <div className="profile-page__main">{returnProfileElem()}</div>
      </section>
   );
};

export default ProfilePage;
