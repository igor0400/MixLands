import { FC } from 'react';
import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../images/icons/logo.svg';

import './header.scss';

interface locationType {
   pathname: string;
   search: string;
   hash: string;
   state: null | [];
   key: string;
}

interface navItemType {
   linkTo: string;
   label: string;
   id: number;
}

const navsItems = [
   {
      linkTo: '/',
      label: 'Главная',
      id: 0,
   },
   {
      linkTo: '/stats',
      label: 'Статистика',
      id: 1,
   },
   {
      linkTo: '/wiki',
      label: 'Вики',
      id: 2,
   },
];

function returnPageNum(location: locationType) {
   const page: Array<navItemType> = navsItems.filter(
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
                  className="py-20"
               />
            ))}
         </Tabs>
      </Box>
   );
}

const Header: FC = () => {
   return (
      <header className="header">
         <div className="header__wrapper container mx-auto flex justify-between px-4">
            <img src={logo} alt="logo" />
            <NavTabs />
            <div className="login flex items-center">
               <button className="btn accent-btn ">Войти</button>
            </div>
         </div>
      </header>
   );
};

export default Header;
