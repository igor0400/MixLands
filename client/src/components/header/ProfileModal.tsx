import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleType } from '../../utils/types';
import { getSlicedNickname } from '../../utils/supportFunctions';

import faceDefault from '../../images/face-default.png';
import { useSelector } from 'react-redux';

interface Props {
   isProfileHovered: boolean;
}

const ProfileModal: FC<Props> = ({ isProfileHovered }) => {
   const { userData } = useSelector((state: any) => state.user);
   const [hightestRole, setHightestRole] = useState<RoleType>({
      name: 'Loading...',
      color: '#09a6e9',
      top_role: true,
   });

   useEffect(() => {
      userData?.siteData?.roles.forEach((item: RoleType) => {
         if (item.top_role) {
            setHightestRole(item);
         }
      });
   }, [userData?.siteData?.roles]);

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
                  <div className="flex role rounded-md py-1 px-2">
                     <div
                        className="role__circle"
                        style={{ background: hightestRole.color }}
                     ></div>
                     <h6 className="text-xs">{hightestRole.name}</h6>
                  </div>
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
