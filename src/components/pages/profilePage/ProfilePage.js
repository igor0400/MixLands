import { useState } from 'react';

import ProfileProfile from './ProfileProfile';
import ProfileNews from './ProfileNews';
import ProfilePosts from './ProfilePosts';
import ProfilePlayers from './ProfilePlayers';
import ProfileBank from './ProfileBank';
// import ProfileFines from './ProfileFines';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
         // case 'fines':
         //    return (
         //       <ProfileFines
         //          defaultCards={defaultCards}
         //          defaultCardsError={defaultCardsError}
         //          specialCards={specialCards}
         //          setModal={setModal}
         //          modal={modal}
         //          handleClose={handleClose}
         //          isBuy={isBuy}
         //          setIsBuy={setIsBuy}
         //       />
         //    );
      }
   }

   return (
      <section className="profile-page mw1400 animate__animated animate__fadeIn">
         <div className="profile-page__wrapper">
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
                     className={
                        activeProfile === 'news' ? 'profile-active' : null
                     }
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
                     className={
                        activeProfile === 'bank' ? 'profile-active' : null
                     }
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
         </div>
         <div className="profile-page__nav-bar__media">
            <LabelBottomNavigation setActiveProfile={setActiveProfile} />
         </div>
      </section>
   );
};

function LabelBottomNavigation({ setActiveProfile }) {
   const [value, setValue] = useState('profile');

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const buttons = [
      { label: 'профиль', value: 'profile', icon: <PersonIcon /> },
      {
         label: 'новости',
         value: 'news',
         icon: <NewspaperIcon />,
      },
      { label: 'посты', value: 'posts', icon: <ArticleIcon /> },
      { label: 'игроки', value: 'players', icon: <SmartToyIcon /> },
      { label: 'банк', value: 'bank', icon: <AccountBalanceIcon /> },
   ];

   return (
      <BottomNavigation
         value={value}
         onChange={handleChange}
         style={{ background: 'rgb(33, 30, 41)', height: '70px' }}
      >
         {buttons.map((item, i) => (
            <BottomNavigationAction
               label={item.label}
               value={item.value}
               icon={item.icon}
               onClick={() => setActiveProfile(item.value)}
               style={{ minWidth: '64px' }}
               key={i}
            />
         ))}
      </BottomNavigation>
   );
}

export default ProfilePage;
