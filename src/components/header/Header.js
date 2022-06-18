import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/icons/logo.png';
import { useState } from 'react';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DehazeIcon from '@mui/icons-material/Dehaze';

const Header = ({
   modal,
   setModal,
   iconClass,
   dropdownClass,
   dropdownActive,
   handleHeaderShow,
   handleHeaderClose,
}) => {
   const user = JSON.parse(localStorage.getItem('user'));

   return (
      <header className="header">
         <div className="header__wrapper mw1400">
            <div className="header__logo">
               <NavLink to="/">
                  <img src={logo} alt="logo" />
               </NavLink>
            </div>
            <div className="header__nav">
               <ul>
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        isActive ? 'header-active' : null
                     }
                  >
                     <li>Главная</li>
                  </NavLink>
                  <NavLink
                     to="/stats"
                     className={({ isActive }) =>
                        isActive ? 'header-active' : null
                     }
                  >
                     <li>Статистика</li>
                  </NavLink>
                  <NavLink
                     to="/wiki"
                     className={({ isActive }) =>
                        isActive ? 'header-active' : null
                     }
                  >
                     <li>Вики</li>
                  </NavLink>
                  <NavLink
                     to="/shop"
                     className={({ isActive }) =>
                        isActive ? 'header-active' : null
                     }
                  >
                     <li>Магазин</li>
                  </NavLink>
               </ul>
            </div>
            <div className="header-btn">
               {user ? (
                  <div className="profile-btn">
                     <div
                        className="header-btn__dropdown__target"
                        onClick={() => {
                           dropdownActive
                              ? handleHeaderClose()
                              : handleHeaderShow();
                        }}
                     >
                        <span
                           className="header-profile__btn"
                           style={dropdownActive ? { color: '#fff' } : null}
                        >
                           Профиль
                        </span>
                        <svg
                           className={iconClass}
                           width="18"
                           height="18"
                           viewBox="0 0 18 18"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M15 12L9 6L3 12" />
                        </svg>
                     </div>
                     {dropdownActive ? (
                        <div
                           className={`dropdown__item animate__animated ${dropdownClass}`}
                        >
                           <Link to="/profile">
                              <p
                                 className="go-profile"
                                 onClick={handleHeaderClose}
                              >
                                 Перейти в профиль
                              </p>
                           </Link>
                           <Link to="/notifications">
                              <p
                                 className="notifications"
                                 onClick={handleHeaderClose}
                              >
                                 Уведомления
                                 {user.notifications &&
                                 user.notifications.new ? (
                                    <span className="notifications__circle">
                                       {
                                          Object.keys(user.notifications.new)
                                             .length
                                       }
                                    </span>
                                 ) : null}
                              </p>
                           </Link>
                           <p
                              className="chps"
                              onClick={() => {
                                 handleHeaderClose();
                                 setModal('changePassword');
                              }}
                           >
                              Сменить пароль
                           </p>
                           <Link to="/">
                              <p
                                 className="out"
                                 onClick={() => {
                                    localStorage.removeItem('user');
                                    handleHeaderClose();
                                 }}
                              >
                                 Выйти
                              </p>
                           </Link>
                        </div>
                     ) : null}
                  </div>
               ) : (
                  <button
                     className="btn btn-blue"
                     onClick={() => setModal('login')}
                  >
                     Авторизация
                  </button>
               )}
            </div>
            <TemporaryDrawer
               setModal={setModal}
               handleHeaderClose={handleHeaderClose}
            />
         </div>
      </header>
   );
};

function TemporaryDrawer({ setModal, handleHeaderClose }) {
   const user = JSON.parse(localStorage.getItem('user'));

   const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };

   const list = (anchor) => (
      <Box
         sx={{ width: 250 }}
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
         className="temporary-drawer__body"
         style={{
            background: '#211e29',
            height: '100%',
            color: 'rgb(169 169 169)',
         }}
      >
         <List>
            {[
               { text: 'Главная', link: '' },
               { text: 'Статистика', link: 'stats' },
               { text: 'Вики', link: 'wiki' },
               { text: 'Магазин', link: 'shop' },
            ].map((item, i) => (
               <NavLink
                  to={`/${item.link}`}
                  style={({ isActive }) => ({
                     color: isActive ? '#fff' : 'rgb(169 169 169)',
                     background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'none',
                  })}
                  key={i}
               >
                  <ListItem disablePadding>
                     <ListItemButton>
                        <p>{item.text}</p>
                     </ListItemButton>
                  </ListItem>
               </NavLink>
            ))}
         </List>
         <Divider />
         <List>
            {user ? (
               <>
                  <NavLink
                     to="/profile"
                     style={({ isActive }) => ({
                        color: isActive ? '#fff' : 'rgb(169 169 169)',
                     })}
                  >
                     <ListItem
                        disablePadding
                        className="go-profile"
                        onClick={handleHeaderClose}
                     >
                        <ListItemButton>
                           <p>Перейти в профиль</p>
                        </ListItemButton>
                     </ListItem>
                  </NavLink>
                  <NavLink
                     to="/notifications"
                     style={({ isActive }) => ({
                        color: isActive ? '#fff' : 'rgb(169 169 169)',
                     })}
                  >
                     <ListItem
                        disablePadding
                        className="notifications"
                        onClick={handleHeaderClose}
                     >
                        <ListItemButton>
                           <p>
                              Уведомления
                              {user.notifications && user.notifications.new ? (
                                 <span className="notifications__circle">
                                    {Object.keys(user.notifications.new).length}
                                 </span>
                              ) : null}
                           </p>
                        </ListItemButton>
                     </ListItem>
                  </NavLink>
                  <ListItem
                     disablePadding
                     className="chps"
                     onClick={() => {
                        handleHeaderClose();
                        setModal('changePassword');
                     }}
                     style={{ color: 'rgb(169 169 169)' }}
                  >
                     <ListItemButton>
                        <p>Сменить пароль</p>
                     </ListItemButton>
                  </ListItem>

                  <Link to="/">
                     <ListItem
                        disablePadding
                        className="out"
                        onClick={() => {
                           localStorage.removeItem('user');
                           handleHeaderClose();
                        }}
                        style={{ color: 'rgb(169 169 169)' }}
                     >
                        <ListItemButton>
                           <p>Выйти</p>
                        </ListItemButton>
                     </ListItem>
                  </Link>
               </>
            ) : (
               <ListItem disablePadding onClick={() => setModal('login')}>
                  <ListItemButton>
                     <p>Авторизация</p>
                  </ListItemButton>
               </ListItem>
            )}
         </List>
      </Box>
   );

   const iOS =
      typeof navigator !== 'undefined' &&
      /iPad|iPhone|iPod/.test(navigator.userAgent);

   return (
      <div className="temporary-drawer" style={{ margin: 'auto 0' }}>
         <Button onClick={toggleDrawer('right', true)} style={{ padding: 0 }}>
            <DehazeIcon style={{ fill: '#fff' }} sx={{ fontSize: 35 }} />
         </Button>
         <SwipeableDrawer
            style={{ zIndex: 10000000 }}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
         >
            {list('right')}
         </SwipeableDrawer>
      </div>
   );
}

export default Header;
