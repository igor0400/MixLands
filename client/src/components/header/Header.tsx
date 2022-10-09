import { FC } from 'react';
import { useSelector } from 'react-redux';

import { NavLink, Link, useLocation } from 'react-router-dom';
import { navsItems } from './utils';

import logo from '../../images/icons/logo.svg';

import './header.scss';

const Header: FC = () => {
   const { userAuth, isLoading } = useSelector((state: any) => state.user);
   const location = useLocation();

   return (
      <header className="header">
         <div className="header__wrapper container mx-auto flex justify-between px-4">
            <img src={logo} alt="logo" />
            <nav className="header__tabs flex">
               {navsItems.map(({ linkTo, label }) => (
                  <NavLink
                     key={label}
                     to={linkTo}
                     className={
                        location?.pathname === linkTo
                           ? 'header__tab__active'
                           : undefined
                     }
                  >
                     <div className="header__tab opacity-50">{label}</div>
                     {location?.pathname === linkTo ? (
                        <div className="header__tab__active__border"></div>
                     ) : null}
                  </NavLink>
               ))}
            </nav>
            <div className="flex items-center">
               {userAuth || isLoading || localStorage.getItem('token') ? (
                  <Link to="/profile">Профиль</Link>
               ) : (
                  <Link to="/login">
                     <button className="default-btn accent-btn">Войти</button>
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
