import { useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';

import infoIcon from '../../../images/icons/info-icon.svg';

const ProfileBank = ({ cards }) => {
  const [bankContent, setBankContent] = useState('userCards');
  const user = JSON.parse(localStorage.getItem('user'));

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
            <div className="existing-cars"></div>
          ) : (
            <h4 className="posts-null">Пока нет карт...</h4>
          )}
          <div className="issue-cards">
            <h2 className="titleh2">Покупка карт</h2>
            <div className="cards">
              {cards.map((item) => (
                <div
                  className="card"
                  style={{ background: `url(${item.imgUrl}) no-repeat` }}
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
                      <p>Цена: {item.price === 0 ? 'Бесплатно' : item.price}</p>
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
