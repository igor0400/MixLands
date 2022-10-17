import { FC, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import headDefault from '../../../images/head-default.png';
import { RoleType } from '../../../utils/types';

import copy from '../../../images/icons/copy.svg';
import emoju from '../../../images/icons/emoju.svg';
import file from '../../../images/icons/file.svg';
import success from '../../../images/icons/check.svg';

import './main.scss';
import ChangeProfileModal from './ChangeProfileModal';
import { sendPost } from './postData';
import { proxy } from '../../../config';
import { getSortedPosts } from '../../../utils/supportFunctions';
import { Spinner } from 'react-bootstrap';

const ProfileMain: FC = () => {
   const { userData } = useSelector((state: any) => state.user);

   const [isImgLoad, setIsImgLoad] = useState<boolean>(false);
   const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
   const [textareaValue, setTextareaValue] = useState<string>('');
   const [fileValue, setFileValue] = useState<any>(false);

   const dispatch = useDispatch();
   const inputFile: any = useRef(null);

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

   const openFileSelect = () => {
      inputFile.current.click();
   };

   const handlePostData = async () => {
      if (textareaValue.length) {
         const formData = new FormData();
         formData.append('content', textareaValue);
         formData.append('image', fileValue);

         setIsPostLoading(true);
         await sendPost(userData.NICKNAME, formData, dispatch);
         setIsPostLoading(false);
         setTextareaValue('');
         setFileValue(false);
      }
   };

   // МБ РАЗБИТЬ ЭТОТ ФАЙЛ НА НЕСКОЛЬКО

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
                           src={fileValue ? success : file}
                           alt="file"
                           className={classNames('default-background', {
                              'file-input-active': fileValue,
                           })}
                           onClick={openFileSelect}
                        />

                        <input
                           type="file"
                           name="post-file"
                           id="post-file"
                           style={{ display: 'none' }}
                           ref={inputFile}
                           accept="image/*"
                           onChange={() =>
                              setFileValue(inputFile.current.files[0])
                           }
                        />
                     </div>
                     {isPostLoading ? (
                        <button className="accent-btn default-btn w-48">
                           <Spinner
                              animation="border"
                              variant="light"
                              size="sm"
                           />
                        </button>
                     ) : (
                        <button
                           className="default-btn accent-btn w-46"
                           onClick={handlePostData}
                           disabled={isPostLoading}
                        >
                           Опубликовать
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <div className="mt-20">
            {userData?.siteData?.posts ? (
               getSortedPosts([...userData.siteData.posts]).map(
                  (item: any, i: number) => (
                     <div
                        key={i}
                        className="bg-gray-700 p-2 mb-2 whitespace-pre-line"
                     >
                        <p className="mb-2">{item.content}</p>
                        {item.image ? (
                           <img src={`${proxy}/${item.image}`} alt="post-img" />
                        ) : null}
                     </div>
                  )
               )
            ) : (
               <p>Нет постов</p>
            )}
         </div>
      </div>
   );
};

export default ProfileMain;
