import { useState, useRef, useEffect } from 'react';
import { database, ref, set } from '../../../firebase/firebase';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import BuyCardModal from '../../modals/BuyCardModal';

import infoIcon from '../../../images/icons/info-icon.svg';
import axios from 'axios';

const ProfileBank = ({
  defaultCards,
  specialCards,
  setModal,
  modal,
  handleClose,
  cardBuyError,
  setCardBuyError,
  isBuy,
  setIsBuy,
  popoverIsBuy,
  setPopoverIsBuy,
}) => {
  const [bankContent, setBankContent] = useState('userCards');
  const [cardId, setCardId] = useState(false);
  const [popoverCardBuyError, setPopoverCardBuyError] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userCards = [];
  const filterDefaultCards = [];

  useEffect(() => {
    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/cards.json')
      .then((res) => {
        console.log(res.data.cardId);
        if (res.data.cardId) setCardId(res.data.cardId);
      });
  }, []);

  for (let key in user.cards) {
    userCards.push(user.cards[key]);
  }

  defaultCards.forEach((item) => {
    if ((user.cards && item.price !== 0) || !user.cards) {
      filterDefaultCards.push(item);
    }
  });

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

  const buyCard = (player, value, buyedCardName, userCard = null) => {
    const vaidateId = (id) => {
      if (id < 10) {
        return `000${id}`;
      } else if (id < 100) {
        return `00${id}`;
      } else if (id < 1000) {
        return `0${id}`;
      } else {
        return `${id}`;
      }
    };

    if (userCard) {
      if (userCard.balance < +value) {
        setCardBuyError('Недостаточно средств на выбранной карте');
      } else {
        if (cardId) {
          setCardBuyError(false);
          setIsBuy('loading');
          set(
            ref(database, `users/${player.name}/mcoins`),
            +player.mcoins - +value
          );

          set(
            ref(database, `users/${player.name}/cards/${userCard.id}/balance`),
            +userCard.balance - +value
          );

          set(ref(database, `users/${player.name}/cards/${cardId}`), {
            name: buyedCardName,
            balance: 0,
            id: cardId,
          });

          set(ref(database, `cards/cardId`), vaidateId(+cardId + 1));

          setIsBuy('succses');
        } else {
          setCardBuyError('Ошибка сервера');
        }
      }
    } else {
      if (cardId) {
        setPopoverCardBuyError(false);
        setPopoverIsBuy('loading');

        set(ref(database, `users/${player.name}/cards/${cardId}`), {
          name: buyedCardName,
          balance: 0,
          id: cardId,
        });

        set(ref(database, `cards/cardId`), vaidateId(+cardId + 1));

        setPopoverIsBuy('succses');
      } else {
        setPopoverCardBuyError('Ошибка сервера');
      }
    }
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

                specialCards.forEach((specialCard) => {
                  if (specialCard.name === item.name) {
                    cardName = specialCard;
                  }
                });

                return (
                  <div
                    className="bank-card"
                    key={item.id}
                    style={{
                      background: `100% bottom / 100% no-repeat url(${cardName.imgUrl})`,
                    }}
                  >
                    <div className="bank-card__top">
                      <div className="bank-card__top__title">
                        <p style={{ color: item.color ? item.color : '#fff' }}>
                          ML - {item.id}
                        </p>
                        <p style={{ color: item.color ? item.color : '#fff' }}>
                          {cardName.ratity}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: '1 1 auto' }}></div>
                    <div className="bank-card__bottom">
                      <div className="bank-card__bottom__price">
                        <p style={{ color: item.color ? item.color : '#fff' }}>
                          Баланс: {getBalance(item.balance)}
                        </p>
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
              {sortCards(filterDefaultCards).map((item, i) => (
                <div
                  className="bank-card"
                  style={{
                    background: `100% center / 100% no-repeat url(${item.imgUrl})`,
                  }}
                  key={i}
                >
                  <div className="bank-card__top">
                    <div className="bank-card__top__title">
                      <p>ML</p>
                      <p>{item.ratity}</p>
                    </div>
                    <div className="bank-card__top__icon">
                      <CardsInfo
                        item={item}
                        modal={modal}
                        handleClose={handleClose}
                        cardBuyError={cardBuyError}
                        userCards={userCards}
                        defaultCards={defaultCards}
                        specialCards={specialCards}
                        getBalance={getBalance}
                        user={user}
                        buyCard={buyCard}
                        setModal={setModal}
                        setCardBuyError={setCardBuyError}
                        isBuy={isBuy}
                        setIsBuy={setIsBuy}
                        popoverCardBuyError={popoverCardBuyError}
                        popoverIsBuy={popoverIsBuy}
                        setPopoverIsBuy={setPopoverIsBuy}
                      />
                    </div>
                  </div>
                  <div style={{ flex: '1 1 auto' }}></div>
                  <div className="bank-card__bottom">
                    <div className="bank-card__bottom__price">
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

const CardsInfo = ({
  item,
  modal,
  handleClose,
  cardBuyError,
  userCards,
  defaultCards,
  specialCards,
  getBalance,
  user,
  buyCard,
  setModal,
  setCardBuyError,
  setIsBuy,
  isBuy,
  popoverCardBuyError,
  popoverIsBuy,
  setPopoverIsBuy,
}) => {
  const [popoverShow, setPopoverShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handlePopoverClick = (event) => {
    setPopoverShow(!popoverShow);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <img
        src={infoIcon}
        alt="info"
        onClick={(e) => {
          handlePopoverClick(e);
          setPopoverIsBuy(false);
        }}
        id="img-trigger"
      />

      <Overlay
        show={popoverShow}
        target={target}
        placement="top"
        container={ref}
        containerPadding={10}
      >
        <Popover id="popover-positioned-top" className="card-popover">
          <Popover.Body>
            <h6>Покупка карты</h6>
            <p>
              <span style={{ color: '#B4B4B4' }}>Текстура:</span> {item.texture}
            </p>
            <p>
              <span style={{ color: '#B4B4B4' }}>Редкость:</span> ML -{' '}
              {item.ratity}
            </p>
            <p>
              <span style={{ color: '#B4B4B4' }}>Стоимость:</span>{' '}
              {item.price === 0 ? 'Бесплатно' : getBalance(item.price)}
            </p>
            <p className="popover-card-buy-error">{popoverCardBuyError}</p>

            {popoverIsBuy === 'loading' ? (
              'loading'
            ) : popoverIsBuy === 'succses' ? (
              <button className="btn btn-green btn-buy-green">
                <div className="animate__animated animate__fadeInLeft">
                  Готово
                </div>
              </button>
            ) : (
              <button
                className="btn btn-blue btn-buy"
                onClick={() => {
                  if (item.price === 0) {
                    buyCard(user, item.price, item.name);
                  } else {
                    setModal('buyCard');
                  }
                }}
              >
                Купить карту
              </button>
            )}

            <BuyCardModal
              show={modal}
              handleClose={handleClose}
              cardBuyError={cardBuyError}
              setCardBuyError={setCardBuyError}
              userCards={userCards}
              defaultCards={defaultCards}
              specialCards={specialCards}
              getBalance={getBalance}
              buyCard={buyCard}
              user={user}
              buyedCard={item}
              setModal={setModal}
              setIsBuy={setIsBuy}
              isBuy={isBuy}
            />
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default ProfileBank;
