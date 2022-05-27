import { useState, useEffect } from 'react';
import { database, ref, set } from '../../../firebase/firebase';

import Card from '../../card/Card';
import CardsInfoPopover from '../../popovers/CardsInfoPopover';

function ProfileBank({
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
  getData,
  cardId,
  canCardPay,
  setCanCardPay,
}) {
  const [bankContent, setBankContent] = useState('userCards');
  const [popoverCardBuyError, setPopoverCardBuyError] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const userCards = [];
  const filterDefaultCards = [];

  useEffect(() => console.log(userCards), []);

  const getUserCards = () => {
    for (let key in user.cards) {
      userCards.push(user.cards[key]);
    }
  };
  getUserCards();

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

  const serchCard = (buyedCardName) => {
    let cardActive = false;

    userCards.forEach((userCard) => {
      if (buyedCardName === userCard.name) {
        cardActive = true;
        setCardBuyError('У вас уже есть данная карта');
      }
    });

    console.log(buyedCardName)
    return cardActive;
  };

  const postBuyedCard = async (
    player,
    value,
    userCard,
    buyedCardName,
    vaidateId,
    cardError
  ) => {
    if (cardId) {
      await setCardBuyError(false);
      await setIsBuy('loading');
      await set(
        ref(database, `users/${player.name}/mcoins`),
        +player.mcoins - +value
      );

      await set(
        ref(database, `users/${player.name}/cards/${userCard.id}/balance`),
        +userCard.balance - +value
      );

      await set(ref(database, `users/${player.name}/cards/${cardId}`), {
        name: buyedCardName,
        balance: 0,
        id: cardId,
      });

      await set(ref(database, `cards/cardId`), vaidateId(+cardId + 1));

      await setIsBuy('succses');
      await setTimeout(() => {
        getData();
        getUserCards();
        setModal(false);
        setIsBuy(false);
      }, 1000);
    } else {
      cardError('Ошибка сервера');
    }
  };

  const buyCard = async (player, value, buyedCardName, userCard = null) => {
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
        if (!serchCard(buyedCardName)) {
          console.log(serchCard(buyedCardName));
          await postBuyedCard(
            player,
            value,
            userCard,
            buyedCardName,
            vaidateId,
            setCardBuyError
          );
        } else {
          console.log(serchCard(buyedCardName));
        }
      }
    } else {
      if (serchCard(buyedCardName)) {
        console.log(serchCard(buyedCardName));
        if (cardId) {
          await setPopoverCardBuyError(false);
          await setPopoverIsBuy('loading');

          await set(ref(database, `users/${player.name}/cards/${cardId}`), {
            name: buyedCardName,
            balance: 0,
            id: cardId,
          });

          await set(ref(database, `cards/cardId`), vaidateId(+cardId + 1));

          await setPopoverIsBuy('succses');

          await setTimeout(() => {
            getData();
            setModal(false);
            setIsBuy(false);
          }, 1000);
        } else {
          setPopoverCardBuyError('Ошибка сервера');
        }
      } else {
        console.log(serchCard(buyedCardName));
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
                  <Card
                    key={item.id}
                    item={item}
                    cardName={cardName}
                    getBalance={getBalance}
                    ratityBottom={true}
                  />
                );
              })}
            </div>
          ) : (
            <h4 className="posts-null">Пока нет карт...</h4>
          )}
          <div className="issue-cards">
            <h2 className="titleh2" style={{ maxWidth: '770px' }}>
              Покупка карт
            </h2>
            <div className="cards">
              {sortCards(filterDefaultCards).map((item, i) => (
                <Card
                  item={item}
                  key={i}
                  getBalance={getBalance}
                  icon={
                    <CardsInfoPopover
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
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : bankContent === 'transfers' ? (
        <div className="profile-page__bank__transfers"></div>
      ) : null}
    </div>
  );
}

export default ProfileBank;
