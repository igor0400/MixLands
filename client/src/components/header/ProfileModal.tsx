import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateUserType, RoleType } from '../../utils/types';
import { getSlicedNickname, getUserRoles } from '../../utils/supportFunctions';
import { useSelector } from 'react-redux';

import faceDefault from '../../images/face-default.png';

import { discordAuthLink } from '../../config';

interface Props {
   isProfileHovered: boolean;
   userData: PrivateUserType;
}

const ProfileModal: FC<Props> = ({ isProfileHovered, userData }) => {
   const [hightestRole, setHightestRole] = useState<RoleType>({
      name: 'Loading...',
      id: '000000000',
      prioritet: 0,
   });
   const { isDiscordRequired, discordUserData } = useSelector(
      (state: any) => state.user
   );

   useEffect(() => {
      if (discordUserData.roles) {
         setHightestRole(
            getUserRoles(discordUserData.roles).sort(
               (a, b) => b.prioritet - a.prioritet
            )[0]
         );
      }
   }, [discordUserData.roles]);

   return (
      <div
         className="profile-modal animate__animated animate__fadeIn animate__faster pt-3"
         style={{ display: isProfileHovered ? 'block' : 'none' }}
      >
         <div className="dropdown__item p-4 rounded-lg">
            <div className="flex">
               <img
                  src={
                     userData.NICKNAME
                        ? `https://mc-heads.net/avatar/${userData.NICKNAME}`
                        : faceDefault
                  }
                  onError={(e: any) => (e.target.src = faceDefault)}
                  alt="avatar"
                  className="w-11 h-11 rounded-md"
               />
               <div className="pl-3">
                  <h5 className="text-lg font-bold mb-1">
                     {getSlicedNickname(
                        userData.NICKNAME || 'Loading...',
                        20,
                        17
                     )}
                  </h5>
                  {isDiscordRequired ? (
                     <div>{hightestRole.name}</div>
                  ) : (
                     <a
                        href={discordAuthLink}
                        className="discord-btn font-semibold p-1"
                     >
                        Привязать Discord
                     </a>
                  )}
               </div>
            </div>

            <div className="pt-4">
               <Link to="/profile">
                  <p className="profile-modal__nav">Перейти в профиль</p>
               </Link>
               <Link to="/change-pass">
                  <p className="profile-modal__nav">Сменить пароль</p>
               </Link>
               <Link to="/">
                  <p className="profile-modal__nav">Выйти</p>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default ProfileModal;
