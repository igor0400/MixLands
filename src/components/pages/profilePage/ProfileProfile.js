import { useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import headDefault from '../../../images/head-default.png';

const ProfileProfile = ({
   getData,
   changeStatus,
   setChangeStatus,
   headColor,
   setHeadColor,
   changeHeadColor,
   setChangeHeadColor,
   nitro,
}) => {
   const user = JSON.parse(localStorage.getItem('user'));

   const [statsValue, setStatusValue] = useState(user.status);
   const [textareaValue, setTextareaValue] = useState('');
   const [addNewPostError, setAddNewPostError] = useState(false);
   const [addNewPostProggres, setAddNewPostProggres] = useState(false);

   const textarea = document.querySelector('#add-new-post');

   const posts = [];

   if (user.posts) {
      for (let post in user.posts) {
         posts.push({ ...user.posts[post], id: post });
      }
   }

   const onChangeStatus = () => {
      const text = document.querySelector('#user-status__text');

      if (text) {
         text.classList.add('animate__animated');
         text.classList.add('animate__fadeOut');
      }

      setTimeout(() => {
         setChangeStatus('active');
         if (text) {
            text.classList.remove('animate__animated');
            text.classList.remove('animate__fadeOut');
         }
      }, 300);
   };

   const postStatus = async () => {
      if (statsValue === user.status) {
         setChangeStatus(false);
      } else {
         setChangeStatus('loading');

         await set(
            ref(database, `/users/${user.name}/status`),
            statsValue
         ).catch(() => {
            setChangeStatus('error');
            setTimeout(() => setChangeStatus(false), 2000);
         });
         await getData();
         setChangeStatus(false);
      }
   };

   const postHeadColor = async () => {
      setHeadColor('loading');

      await set(
         ref(database, `/users/${user.name}/headColor`),
         headColor
      ).catch(() => {
         setHeadColor('error');
         setTimeout(() => setHeadColor(headColor), 2000);
      });
      await getData();
      await setTimeout(() => {
         setHeadColor(headColor);
         setChangeHeadColor(false);
      }, 1000);
   };

   function plusZero(value) {
      if (value < 10) {
         value = '0' + value;
      }
      return value;
   }

   function getDateTime() {
      const now = new Date();
      const day = plusZero(now.getDate());
      const month = plusZero(now.getMonth() + 1);
      const year = now.getFullYear();
      const hours = plusZero(now.getHours());
      const minutes = plusZero(now.getMinutes());

      return `${hours}:${minutes} ${day}.${month}.${year}`;
   }
   function getClearDateTime() {
      const now = new Date();
      const day = plusZero(now.getDate());
      const month = plusZero(now.getMonth() + 1);
      const year = now.getFullYear();
      const hours = plusZero(now.getHours());
      const minutes = plusZero(now.getMinutes());
      const seconds = plusZero(now.getSeconds());

      return `${year}${month}${day}${hours}${minutes}${seconds}`;
   }

   const addNewPost = async () => {
      if (textareaValue === '') {
         setAddNewPostError('Заполните поле');
         setAddNewPostProggres('error');
         return;
      }

      setAddNewPostError(false);
      setAddNewPostProggres('loading');

      await axios
         .post(
            `https://mixlands-3696a-default-rtdb.firebaseio.com/users/${user.name}/posts.json`,
            {
               text: textareaValue,
               date: getDateTime(),
               clearDate: getClearDateTime(),
            }
         )
         .then(async () => {
            setAddNewPostProggres('succses');
            await getData();
            textarea.value = '';
            setTimeout(() => setAddNewPostProggres(false), 2000);
         })
         .catch(() => {
            setAddNewPostError('Ошибка сервера');
            setAddNewPostProggres('error');
         });
   };

   const getBalance = (item) =>
      item < 64
         ? `${item} MK`
         : item >= 64
         ? item % 64 === 0
            ? `${Math.floor(item / 64)} CMK`
            : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
         : '0 MK';

   return (
      <div className="profile-page__profile animate__animated animate__fadeIn duration05">
         <div className="profile-page__profile__info">
            <div className="profile-page__profile__info__logo">
               {nitro ? (
                  <div
                     className="head-color"
                     style={{
                        right:
                           changeHeadColor &&
                           headColor !== 'loading' &&
                           headColor !== 'error'
                              ? -98
                              : 0,
                     }}
                  >
                     {headColor === 'loading' ? (
                        <Spinner
                           animation="border"
                           variant="primary"
                           size="sm"
                           style={{ margin: '5px' }}
                        />
                     ) : headColor === 'error' ? (
                        <p className="head-color__error">Ошибка</p>
                     ) : (
                        <div className="change-color" id="change-color-trigger">
                           <Form.Control
                              type="color"
                              id="head-color-input"
                              defaultValue={headColor}
                              title="Сменить цвет"
                              onChange={(e) => setHeadColor(e.target.value)}
                              onClick={() => setChangeHeadColor(true)}
                           />
                           {changeHeadColor ? (
                              <div>
                                 <button
                                    id="change-color-trigger"
                                    className="change-color__btn"
                                    onClick={() => {
                                       if (headColor !== user.headColor) {
                                          postHeadColor();
                                       } else {
                                          setChangeHeadColor(false);
                                       }
                                    }}
                                 >
                                    Сохранить
                                 </button>
                              </div>
                           ) : null}
                        </div>
                     )}
                  </div>
               ) : null}
               <img
                  style={{ background: headColor }}
                  src={`https://mc-heads.net/head/${user.name}`}
                  alt="head"
                  onError={(e) => (e.target.src = headDefault)}
               />
            </div>
            <div className="profile-page__profile__info__descr">
               <p className="name profile-p">{user.name}</p>
               <p className="hours profile-p">
                  <span style={{ color: '#B4B4B4' }}>Наигранные часы:</span>{' '}
                  {user.hours}ч.
               </p>
               <p className="mcoins profile-p">
                  <span style={{ color: '#B4B4B4' }}>Баланс:</span>{' '}
                  {getBalance(user.mcoins)}
               </p>
               <p
                  className="rank profile-p"
                  style={{
                     color:
                        user.rank === 'Модератор'
                           ? '#FFB800'
                           : user.rank === 'Администратор'
                           ? '#FF004D'
                           : '#fff',
                  }}
               >
                  <span style={{ color: '#B4B4B4' }}>Ранг:</span>{' '}
                  {user.rank ? user.rank : 'Игрок'}
               </p>
               <div className="status profile-p">
                  <span style={{ color: '#B4B4B4' }}>Статус:</span>{' '}
                  {changeStatus ? (
                     <input
                        className="animate__animated animate__flipInX"
                        defaultValue={user.status}
                        id="change-status"
                        type="text"
                        placeholder="Введите статус..."
                        maxLength="60"
                        onChange={(e) => setStatusValue(e.target.value)}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') postStatus();
                        }}
                     />
                  ) : user.status ? (
                     <p id="user-status__text" className="status__text">
                        {user.status}
                     </p>
                  ) : (
                     <p id="user-status__text" className="status__text">
                        Нет статуса
                     </p>
                  )}{' '}
                  <div className="status__change" id="change-status">
                     {changeStatus === 'active' ? (
                        <button
                           id="change-status"
                           onClick={() => {
                              postStatus();
                           }}
                        >
                           Сохранить
                        </button>
                     ) : changeStatus === 'loading' ? (
                        <Spinner
                           id="change-status"
                           animation="border"
                           variant="primary"
                           size="sm"
                           style={{ marginLeft: 5 }}
                        />
                     ) : changeStatus === 'error' ? (
                        <p id="change-status">Ошибка сервера</p>
                     ) : (
                        <svg
                           id="change-status"
                           onClick={onChangeStatus}
                           width="24"
                           height="24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M14 6l2.293-2.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L18 10m-4-4l-9.707 9.707a1 1 0 00-.293.707V19a1 1 0 001 1h2.586a1 1 0 00.707-.293L18 10m-4-4l4 4" />
                        </svg>
                     )}
                  </div>
               </div>
               <p className="skin profile-p">
                  <span style={{ color: '#B4B4B4' }}>Скин:</span>{' '}
                  <a
                     href={`https://ru.namemc.com/profile/${
                        user ? user.name : null
                     }`}
                  >
                     открыть
                  </a>
               </p>
            </div>
         </div>
         <div className="profile-page__profile__posts">
            <div className="profile-page__profile__posts__top">
               <h2 className="titleh2">Посты</h2>
            </div>
            <div className="profile-page__profile__posts__add-new">
               {addNewPostError ? (
                  <p className="error">{addNewPostError}</p>
               ) : null}
               <div className="textarea">
                  <textarea
                     placeholder="Напишите пост..."
                     name="add-new-post"
                     id="add-new-post"
                     maxLength="500"
                     onChange={(e) => setTextareaValue(e.target.value + '')}
                  />
                  <span>{textareaValue.length}/500</span>
               </div>
               <div className="add-posts-btn">
                  <div className="support__btns">
                     <button
                        className="support-btn"
                        onClick={() => {
                           textarea.value = '';
                           setTextareaValue('');
                        }}
                     >
                        Очистить
                     </button>
                  </div>
                  {addNewPostProggres === 'loading' ? (
                     <button className="btn btn-blue btn-loading">
                        <Spinner
                           animation="border"
                           variant="primary"
                           size="sm"
                        />
                     </button>
                  ) : addNewPostProggres === 'succses' ? (
                     <button className="btn btn-succses succses">
                        <div className="animate__animated animate__fadeInLeft">
                           Готово
                        </div>
                     </button>
                  ) : (
                     <button className="btn btn-blue" onClick={addNewPost}>
                        Опубликовать
                     </button>
                  )}
               </div>
            </div>
            {user.posts ? (
               posts.reverse().map((item, i) => (
                  <div className="user__post" key={i}>
                     <div className="title">
                        {user.name} — {item.date}
                     </div>
                     <div className="text">{item.text}</div>
                  </div>
               ))
            ) : (
               <h4 className="posts-null">Пока нет постов</h4>
            )}
         </div>
      </div>
   );
};

export default ProfileProfile;
