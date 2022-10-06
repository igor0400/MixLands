import { FC } from 'react';
import { useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import { NavLink, useLocation, Link } from 'react-router-dom';
import { LocationType, NavItemType, navsItems } from './utils';

import { Box, Tabs, Tab } from '@mui/material';

import logo from '../../images/icons/logo.svg';

import './header.scss';

function returnPageNum(location: LocationType) {
   const page: Array<NavItemType> = navsItems.filter(
      ({ linkTo }) => linkTo === location.pathname
   );

   return page[0]?.id;
}

function NavTabs() {
   const location = useLocation();
   const [value, setValue] = useState(returnPageNum(location));

   const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            centered
         >
            {navsItems.map(({ linkTo, label, id }) => (
               <Tab
                  key={id}
                  label={label}
                  component={NavLink}
                  to={linkTo}
                  className="nav-tab"
                  disableRipple
               />
            ))}
         </Tabs>
      </Box>
   );
}

const Header: FC = () => {
   const { userAuth } = useSelector((state: any) => state.user);

   return (
      <header className="header">
         <div className="header__wrapper container mx-auto flex justify-between px-4">
            <img src={logo} alt="logo" />
            <NavTabs />
            <div className="flex items-center">
               {userAuth ? (
                  <Link to="/profile">Профиль</Link>
               ) : (
                  <Link to="/login">
                     <button className="btn accent-btn">Войти</button>
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
