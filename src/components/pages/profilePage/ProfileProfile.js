import { useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import postsPlus from '../../../images/icons/posts-plus.svg';

const ProfileProfile = ({
  getData,
  setModal,
  changeStatus,
  setChangeStatus,
  headColor,
  setHeadColor,
  changeHeadColor,
  setChangeHeadColor,
}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [statsValue, setStatusValue] = useState(user.status);

  const posts = [];

  if (user.posts) {
    for (let post in user.posts) {
      posts.push(user.posts[post]);
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
      let response = true;

      await axios
        .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
        .catch(() => {
          setChangeStatus('error');
          response = false;
          setTimeout(() => setChangeStatus(false), 2000);
        });

      if (response) {
        await set(ref(database, `/users/${user.name}/status`), statsValue);
        await getData();
        setChangeStatus(false);
      }
    }
  };

  const postHeadColor = async () => {
    setHeadColor('loading');

    let response = true;

    await axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .catch(() => {
        setHeadColor('error');
        response = false;
      });

    if (response) {
      await set(ref(database, `/users/${user.name}/headColor`), headColor);
      await getData();
      await setTimeout(() => {
        setHeadColor(headColor);
        setChangeHeadColor(false);
      }, 1000);
    } else {
      setTimeout(() => setHeadColor(headColor), 2000);
    }
  };

  return (
    <div className="profile-page__profile">
      <div className="profile-page__profile__info">
        <div className="profile-page__profile__info__logo">
          {user.nitro ||
          user.rank === 'Администратор' ||
          user.rank === 'Модератор' ? (
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
          />
        </div>
        <div className="profile-page__profile__info__descr">
          <p className="name profile-p">{user.name}</p>
          <p className="hours profile-p">
            <span style={{ color: '#B4B4B4' }}>Наигранные часы:</span>{' '}
            {user.hours}ч.
          </p>
          <p className="mcoins profile-p">
            <span style={{ color: '#B4B4B4' }}>Баланс:</span> {user.mcoins} МК
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
            <button onClick={() => setModal('skin')}>открыть</button>
          </p>
        </div>
      </div>
      <div className="profile-page__profile__posts">
        <div className="profile-page__profile__posts__top">
          <div></div>
          <h2 className="titleh2">Посты</h2>
          <img src={postsPlus} alt="plus" />
        </div>
        {user.posts ? (
          posts.reverse().map((item) => (
            <div className="profile-page__profile__posts__post" key={item.id}>
              <div className="title">
                {user.name} — {item.date}
              </div>
              <div className="text">{item.text}</div>
            </div>
          ))
        ) : (
          <h4 className="posts-null">
            Пока нет постов <a href="#">написать пост</a>
          </h4>
        )}
      </div>
    </div>
  );
};

export default ProfileProfile;
