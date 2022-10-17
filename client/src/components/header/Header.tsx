import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { NavLink, Link, useLocation } from 'react-router-dom';
import { navsItems } from './utils';

import logo from '../../images/icons/logo.svg';
import faceDefault from '../../images/face-default.png';

import './header.scss';
import ProfileModal from './ProfileModal';

const Header: FC = () => {
   const [isProfileHovered, setIsProfileHovered] = useState<boolean>(false);
   const [isImgLoad, setIsImgLoad] = useState<boolean>(false);

   const { userData, userAuth, isLoading } = useSelector(
      (state: any) => state.user
   );
   const location = useLocation();

   const handleHover = () => {
      setIsProfileHovered(true);
   };
   const handleUnHover = () => {
      setIsProfileHovered(false);
   };

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
                  <div
                     className="profile-btn flex relative"
                     onMouseLeave={handleUnHover}
                     onMouseEnter={handleHover}
                  >
                     <img
                        src={faceDefault}
                        alt="head"
                        style={{ display: isImgLoad ? 'none' : 'block' }}
                        className="w-11 h-11 rounded-md cursor-pointer"
                     />
                     <img
                        src={`https://mc-heads.net/avatar/${
                           userData.NICKNAME || 'что-то'
                        }`}
                        alt="head"
                        style={{ display: isImgLoad ? 'block' : 'none' }}
                        className="w-11 h-11 rounded-md cursor-pointer"
                        onLoad={() => setIsImgLoad(true)}
                     />

                     <svg
                        className={classNames('cursor-pointer', {
                           'animated__profile-btn': isProfileHovered,
                        })}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M15 12L9 6L3 12" stroke="#fff" />
                     </svg>
                     <ProfileModal isProfileHovered={isProfileHovered} />
                  </div>
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
