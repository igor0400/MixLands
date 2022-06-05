import axios from 'axios';
import { useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';

const ProfileNews = ({ getData, copyText, news }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [textareaValue, setTextareaValue] = useState('');
  const [addNewsError, setAddNewsError] = useState(false);
  const [addNewsProggres, setAddNewsProggres] = useState(false);

  const textarea = document.querySelector('#add-news');

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

  const addNews = async () => {
    if (textareaValue === '') {
      setAddNewsError('Заполните поле');
      setAddNewsProggres('error');
      return;
    }

    setAddNewsError(false);
    setAddNewsProggres('loading');

    await axios
      .post(`https://mixlands-3696a-default-rtdb.firebaseio.com/news.json`, {
        text: textareaValue,
        date: getDateTime(),
        clearDate: getClearDateTime(),
        owner: user.name,
      })
      .then(async () => {
        setAddNewsProggres('succses');
        await getData();
        textarea.value = '';
        setTimeout(() => setAddNewsProggres(false), 2000);
      })
      .catch(() => {
        setAddNewsError('Ошибка сервера');
        setAddNewsProggres('error');
      });
  };

  return (
    <div className="profile-page__news animate__animated animate__fadeIn duration05">
      <div className="profile-page__news__top">
        <h2 className="titleh2">Новости</h2>
      </div>
      {user.rank === 'Модератор' || user.rank === 'Администратор' ? (
        <div className="profile-page__news__add-new">
          {addNewsError ? <p className="error">{addNewsError}</p> : null}
          <div className="textarea">
            <textarea
              placeholder="Напишите новость..."
              name="add-news"
              id="add-news"
              maxLength="500"
              onChange={(e) => setTextareaValue(e.target.value + '')}
            />
            <span>{textareaValue.length}/500</span>
          </div>
          <div className="add-news-btn">
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
              <button
                className="support-btn"
                onClick={() => {
                  if (textareaValue !== '') {
                    copyText(textareaValue, true);
                  }
                }}
              >
                Копировать
              </button>
              <button
                className="support-btn"
                onClick={() => {
                  window.navigator.clipboard.readText().then((data) => {
                    textarea.value += data;
                    setTextareaValue((state) => state + data);
                  });
                }}
              >
                Вставить
              </button>
            </div>
            {addNewsProggres === 'loading' ? (
              <button className="btn btn-blue btn-loading">
                <Spinner animation="border" variant="primary" size="sm" />
              </button>
            ) : addNewsProggres === 'succses' ? (
              <button className="btn btn-succses succses">
                <div className="animate__animated animate__fadeInLeft">
                  Готово
                </div>
              </button>
            ) : (
              <button className="btn btn-blue" onClick={addNews}>
                Опубликовать
              </button>
            )}
          </div>
        </div>
      ) : null}
      {news.length === 0 ? (
        <h4 className="news-null">Пока нет новостей</h4>
      ) : (
        news
          .sort((a, b) => a.clearDate - b.clearDate)
          .reverse()
          .map((item, i) => (
            <div className="user__post" key={i}>
              <div className="title">
                {item.owner} — {item.date}
              </div>
              <div className="text">{item.text}</div>
            </div>
          ))
      )}
    </div>
  );
};

export default ProfileNews;
