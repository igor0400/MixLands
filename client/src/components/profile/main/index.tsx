import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import ChangeProfileModal from './ChangeProfileModal';
import { RoleType } from '../../../utils/types';

import Posts from './Posts';
import CreatePost from './CreatePost';

import headDefault from '../../../images/head-default.png';

import './main.scss';

const ProfileMain: FC = () => {
   const { userData } = useSelector((state: any) => state.user);

   const [isImgLoad, setIsImgLoad] = useState<boolean>(false);

   return (
      <div className="profile__main fade-animation max-w-5xl mx-auto my-8 px-4">
         <div className="bg-ellipse bg-ellipse__orange"></div>
         <div className="flex w-full">
            <div>
               <div className="accent-border p-5 rounded-lg head default-background">
                  <img
                     src={headDefault}
                     alt="head"
                     style={{ display: isImgLoad ? 'none' : 'block' }}
                  />
                  <img
                     src={`https://mc-heads.net/head/${
                        userData.NICKNAME || 'что-то'
                     }`}
                     alt="head"
                     style={{ display: isImgLoad ? 'block' : 'none' }}
                     onLoad={() => setIsImgLoad(true)}
                  />
               </div>
               <div className="mt-2 flex">
                  <div className="accent-border p-2 w-3/4 rounded-lg flex items-center justify-center default-background">
                     Ваши лайки:
                  </div>
                  <div className="accent-border p-2 ml-2 w-1/4 rounded-lg flex items-center justify-center default-background">
                     {userData?.siteData?.liked || 0}
                  </div>
               </div>
            </div>

            <div className="ml-10 w-full">
               <div className="flex justify-between">
                  <h5 className="text-3xl font-bold">
                     {userData.NICKNAME || 'Загрузка...'}
                  </h5>
                  <ChangeProfileModal />
               </div>
               <div className="flex flex-wrap gap-1.5 mt-2">
                  {userData?.siteData?.roles ? (
                     [...userData?.siteData?.roles]
                        .reverse()
                        .map((item: RoleType, i: number) => (
                           <div
                              className="role"
                              style={{ border: `1px solid ${item.color}` }}
                              key={i}
                           >
                              <div
                                 className="role__circle"
                                 style={{ background: item.color }}
                              ></div>
                              <h6>{item.name}</h6>
                           </div>
                        ))
                  ) : (
                     <p>Возможно у вас нет проходки</p>
                  )}
               </div>
               <div className="mt-8 text-lg">
                  <p>
                     <span className="text-gray-300">Наиграно на сервере:</span>{' '}
                     {userData.HOURS} ч.
                  </p>
                  <p>
                     <span className="text-gray-300">Статус:</span>{' '}
                     {userData.STATUS
                        ? `На сервере ${userData.STATUS}`
                        : 'Неактивен'}
                  </p>
                  <p>
                     <span className="text-gray-300">Био:</span>{' '}
                     {userData?.siteData?.bio?.length
                        ? userData.siteData.bio
                        : 'Нет био'}
                  </p>
                  <p>
                     <span className="text-gray-300">Лор персонажа:</span>{' '}
                     {userData?.siteData?.lor?.length
                        ? userData.siteData.lor
                        : 'Нет лора'}
                  </p>
               </div>
               <CreatePost />
               <Posts />
            </div>
         </div>
      </div>
   );
};

export default ProfileMain;
