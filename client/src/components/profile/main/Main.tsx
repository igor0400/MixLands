import { EventHandler, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import headDefault from '../../../images/head-default.png';
import { RoleType } from '../../../utils/types';

import copy from '../../../images/icons/copy.svg';
import emoju from '../../../images/icons/emoju.svg';
import file from '../../../images/icons/file.svg';

import './main.scss';
import ChangeProfileModal from './ChangeProfileModal';

const ProfileMain: FC = () => {
   const [isImgLoad, setIsImgLoad] = useState<boolean>(false);
   const { userData } = useSelector((state: any) => state.user);
   const [textareaValue, setTextareaValue] = useState<string>('');

   const copyText = () => {
      if (textareaValue.length) {
         navigator.clipboard
            .writeText(textareaValue)
            .then(() => {
               toast('Текст скопирован');
            })
            .catch((e) => {
               console.log(e);
            });
      }
   };

   return (
      <div className="profile__main fade-animation max-w-5xl mx-auto px-4">
         <div className="bg-ellipse bg-ellipse__orange"></div>
         <div className="wrapper flex my-8 w-full">
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
               <div className="create-post mt-12">
                  <textarea
                     className="w-full accent-border rounded-lg default-background"
                     value={textareaValue}
                     onChange={(e) => setTextareaValue(e.target.value)}
                     placeholder="Написать пост..."
                     maxLength={300}
                  ></textarea>
                  <div className="flex justify-between mt-1">
                     <div className="flex gap-1 support-btns my-auto">
                        <img
                           src={copy}
                           alt="copy"
                           className="default-background"
                           onClick={copyText}
                        />
                        <img
                           src={emoju}
                           alt="emoju"
                           className="default-background"
                        />
                        <img
                           src={file}
                           alt="file"
                           className="default-background"
                        />
                     </div>
                     <button className="default-btn accent-btn w-fit">
                        Опубликовать
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

{
   /* <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
   <path d="m256 8c-136.957 0-248 111.083-248 248 0 136.997 111.043 248 248 248s248-111.003 248-248c0-136.917-111.043-248-248-248zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12z" />
</svg>; */
}

export default ProfileMain;

// {
/* <div
         className="text"
         style={{
            background: '#fff',
            color: '#000',
            whiteSpace: 'pre-line',
         }}
      >
         {textareaValue}
      </div> */
// }
