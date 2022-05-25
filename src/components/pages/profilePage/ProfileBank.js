import { useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';

import infoIcon from '../../../images/icons/info-icon.svg';

const ProfileBank = ({ defaultCards }) => {
  const [bankContent, setBankContent] = useState('userCards');
  const user = JSON.parse(localStorage.getItem('user'));
  const userCards = [];

  for (let key in user.cards) {
    userCards.push(user.cards[key]);
  }

  const getBalance = (item) =>
    item < 64
      ? `${item} MK`
      : item >= 64
      ? item % 64 === 0
        ? `${(item / 64).toFixed(0)} CMK`
        : `${(item / 64).toFixed(0)} CMK ${(item % 64).toFixed(0)} MK`
      : '0 MK';

  const sortCards = (cards) => {
    const filter = (a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    };

    return cards.sort(filter);
  };

  return (
    <div className="profile-page__bank">
      <div className="profile-page__bank__navs">
        <button
          onClick={() => setBankContent('userCards')}
          className={bankContent === 'userCards' ? 'nav-active' : null}
        >
          Ваши карты
        </button>
        <button
          onClick={() => setBankContent('transfers')}
          className={bankContent === 'transfers' ? 'nav-active' : null}
        >
          Переводы
        </button>
      </div>
      {bankContent === 'userCards' ? (
        <div className="profile-page__bank__user-cards">
          {user.cards ? (
            <div className="existing-cars">
              {userCards.map((item) => {
                let cardName = {};

                defaultCards.forEach((defaultCard) => {
                  if (defaultCard.name === item.name) {
                    cardName = defaultCard;
                  }
                });

                return (
                  <div
                    className="card"
                    key={item.id}
                    style={{
                      background: `url(${cardName.imgUrl}) no-repeat 100% / 100%`,
                    }}
                  >
                    <div className="card__top">
                      <div className="card__top__title">
                        <p>ML - {item.id}</p>
                        <p>{cardName.ratity}</p>
                      </div>
                      <div className="card__top__icon">
                        <img src={infoIcon} alt="info" />
                      </div>
                    </div>
                    <div style={{ flex: '1 1 auto' }}></div>
                    <div className="card__bottom">
                      <div className="card__bottom__price">
                        <p>Баланс: {getBalance(item.balance)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h4 className="posts-null">Пока нет карт...</h4>
          )}
          <div className="issue-cards">
            <h2 className="titleh2">Покупка карт</h2>
            <div className="cards">
              {sortCards(defaultCards).map((item, i) => (
                <div
                  className="card"
                  style={{
                    background: `url(${item.imgUrl}) no-repeat 100% / 100%`,
                  }}
                  key={i}
                >
                  <div className="card__top">
                    <div className="card__top__title">
                      <p>ML</p>
                      <p>{item.ratity}</p>
                    </div>
                    <div className="card__top__icon">
                      <img src={infoIcon} alt="info" />
                    </div>
                  </div>
                  <div style={{ flex: '1 1 auto' }}></div>
                  <div className="card__bottom">
                    <div className="card__bottom__price">
                      <p>
                        Цена:{' '}
                        {item.price === 0
                          ? 'Бесплатно'
                          : getBalance(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : bankContent === 'transfers' ? (
        <div className="profile-page__bank__transfers"></div>
      ) : null}
    </div>
  );
};
export default ProfileBank;
