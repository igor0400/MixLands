import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';

import Card from '../../card/Card';
import CardsInfoPopover from '../../popovers/CardsInfoPopover';
import TransferPopover from '../../popovers/TransferPopover';

import arrowTransfers from '../../../images/icons/arrow-transfers.svg';

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
  getData,
  cardId,
  defaultCardsError,
  players,
  objPlayers,
}) => {
  const [bankContent, setBankContent] = useState('userCards');
  const [popoverCardBuyError, setPopoverCardBuyError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [transferError, setTransferError] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [changeTransfer, setChangeTransfer] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const [filterDefaultCards, setFilterDefaultCards] = useState([]);
  const allCardsById = {};
  const userCards = [];
  const allUsersCards = {};

  const updateAllUsersCards = () => {
    players.forEach((player) => {
      const cards = player.cards;

      if (cards) {
        allUsersCards[player.name] = [];
      }

      for (let key in cards) {
        allUsersCards[player.name].push({
          ...cards[key],
          owner: player.name,
        });

        allCardsById[key] = cards[key];
      }
    });
  };

  updateAllUsersCards();

  const userCardsKeys = Object.keys(user.cards);
  const allUsersCardsKeys = Object.keys(allUsersCards);
  const allUsersCardKeys = allUsersCards[allUsersCardsKeys[0]]
    ? Object.keys(allUsersCards[allUsersCardsKeys[0]])
    : false;

  const [activeTransferCards, setActiveTransferCards] = useState({});

  useEffect(() => {
    setActiveTransferCards(
      allUsersCardKeys
        ? {
            userActiveCard: user.cards[userCardsKeys[0]],
            allUsersActiveCard:
              allUsersCards[allUsersCardsKeys[0]][allUsersCardKeys[0]],
          }
        : {}
    );
    getDefaultCards();
  }, []);

  useEffect(() => {
    for (let key in allCardsById) {
      if (
        activeTransferCards.userActiveCard &&
        activeTransferCards.userActiveCard.id === key
      ) {
        setActiveTransferCards((state) => ({
          ...state,
          userActiveCard: allCardsById[key],
        }));

        console.log('change transfer');
        console.log(activeTransferCards.userActiveCard);
      }
    }
  }, [changeTransfer]);

  //? BUY CARDS

  function getUserCards() {
    for (let key in user.cards) {
      userCards.push(user.cards[key]);
    }
  }

  getUserCards();

  function getDefaultCards() {
    const cards = [];

    defaultCards.forEach((item) => {
      if ((user.cards && item.price !== 0) || !user.cards) {
        cards.push(item);
      }
    });

    setFilterDefaultCards(cards);
  }

  const response = async () => {
    let response = true;

    await axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .catch(() => {
        response = false;
      });

    return response;
  };

  const getBalance = (item) =>
    item < 64
      ? `${item} MK`
      : item >= 64
      ? item % 64 === 0
        ? `${Math.floor(item / 64)} CMK`
        : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
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

    return cardActive;
  };

  const postBuyedCard = async (
    player,
    value,
    userCard,
    buyedCardName,
    vaidateId
  ) => {
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
  };

  const postBuyedCardPopover = async (player, buyedCardName, vaidateId) => {
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

    if (serchCard(buyedCardName)) return;

    if (userCard && userCard.balance < +value) {
      setCardBuyError('Недостаточно средств на выбранной карте');
      return;
    }

    if (cardBuyError) return;

    if (userCard) {
      if (!cardId) {
        setIsBuy('error');
        return;
      }

      if (!response()) {
        setIsBuy('error');
        setTimeout(() => handleClose(), 2000);
        return;
      }

      await postBuyedCard(player, value, userCard, buyedCardName, vaidateId);
    } else {
      if (!cardId) {
        setPopoverIsBuy('error');
        return;
      }

      if (!response()) {
        setPopoverIsBuy('error');
        return;
      }

      await postBuyedCardPopover(player, buyedCardName, vaidateId);
    }
  };

  const getCard = (item, ratityBottom, showBalance, icon = false) => {
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
        icon={icon}
        item={item}
        cardName={cardName}
        getBalance={getBalance}
        ratityBottom={ratityBottom}
        showBalance={showBalance}
      />
    );
  };

  //? TRANSFER

  const transferPayload = async () => {
    // НЕ ОБНОВЛЯЕТСЯ БАЛАНС КАРТЫ, НЕ ВЫВОДИТСЯ ЗАГРУЗКА НА КНОПКУ
    const userCard = activeTransferCards.userActiveCard;
    const allUserCard = activeTransferCards.allUsersActiveCard;
    const input = document.querySelector('#transfer-sum');
    const textarea = document.querySelector('#comment');

    setTransferError(false);

    if (inputValue === '') {
      setTransferError('Заполните поле');
      return;
    }
    if (+inputValue <= 0) {
      setTransferError('Сумма перевода должна быть больше 0');
      return;
    }
    if (userCard.id === allUserCard.id) {
      setTransferError('Нельзя перевести на ту же карту');
      return;
    }
    if (+inputValue > activeTransferCards.userActiveCard.balance) {
      setTransferError('Недостаточно средств');
      return;
    }
    if (!response()) {
      setTransferError('Ошибка сервера');
      return;
    }
    if (transferError) {
      return;
    }

    setTransferLoading(true);

    await players.forEach(async (player) => {
      if (player.name === user.name && user.name !== allUserCard.owner) {
        await set(
          ref(database, `users/${player.name}/mcoins`),
          +player.mcoins - +inputValue
        );
        await set(
          ref(database, `users/${player.name}/cards/${userCard.id}/balance`),
          +userCard.balance - +inputValue
        );
        console.log('Уменшить');
      }

      if (player.name === user.name && user.name === allUserCard.owner) {
        await set(
          ref(database, `users/${player.name}/cards/${userCard.id}/balance`),
          +userCard.balance - +inputValue
        );
        console.log('Уменшить карту');
      }

      if (
        player.name === allUserCard.owner &&
        user.name !== allUserCard.owner
      ) {
        await set(
          ref(database, `users/${player.name}/mcoins`),
          +player.mcoins + +inputValue
        );
        await set(
          ref(database, `users/${player.name}/cards/${allUserCard.id}/balance`),
          +allUserCard.balance + +inputValue
        );
        console.log('Увеличить');
      }

      if (
        player.name === allUserCard.owner &&
        user.name === allUserCard.owner
      ) {
        await set(
          ref(database, `users/${player.name}/cards/${allUserCard.id}/balance`),
          +allUserCard.balance + +inputValue
        );
        console.log('Увеличить карту');
      }
    });

    await getData();
    await updateAllUsersCards();
    await setChangeTransfer((state) => !state);
    await setTransferLoading(false);
    input.value = '';
    textarea.value = '';
  };

  const userActiveCardRatityBottom = () => {
    if (allUsersCardKeys && activeTransferCards.userActiveCard.balance <= 6400)
      return true;
    else return false;
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
      {defaultCardsError ? (
        <h2 className="default-cards-error">Ошибка сервера</h2>
      ) : null}
      {bankContent === 'userCards' ? (
        <div className="profile-page__bank__user-cards">
          {!defaultCardsError ? (
            user.cards ? (
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
                      ratityBottom={item.balance > 6400 ? false : true}
                      showBalance={true}
                    />
                  );
                })}
              </div>
            ) : (
              <h4 className="posts-null">Пока нет карт...</h4>
            )
          ) : null}

          <div className="issue-cards">
            <h2 className="titleh2" style={{ maxWidth: '770px' }}>
              Покупка карт
            </h2>
            {defaultCardsError ? (
              <h2 className="default-cards-error">Ошибка сервера</h2>
            ) : null}
            <div className="cards">
              {!defaultCardsError
                ? sortCards(filterDefaultCards).map((item, i) => (
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
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : bankContent === 'transfers' ? (
        <div className="profile-page__bank__transfers">
          {activeTransferCards.userActiveCard &&
          activeTransferCards.allUsersActiveCard ? (
            <>
              <div className="profile-page__bank__transfers__cards">
                <select
                  name="userCards"
                  id="user-cards"
                  onChange={(e) => {
                    setActiveTransferCards((state) => ({
                      ...state,
                      userActiveCard: user.cards[e.target.value],
                    }));
                  }}
                >
                  {userCards.map((card, i) => (
                    <option key={i} value={card.id}>
                      ML-{card.id} » {user.name}
                    </option>
                  ))}
                </select>
                <div className="arrow-transfers">
                  <img src={arrowTransfers} alt="arrowTransfers" />
                </div>

                <select
                  name="allUsersCards"
                  id="all-users-cards"
                  onChange={(e) =>
                    setActiveTransferCards((state) => ({
                      ...state,
                      allUsersActiveCard: {
                        owner: e.target.value.split(' ')[2],
                        ...objPlayers[e.target.value.split(' ')[2]].cards[
                          e.target.value.split(' ')[0].slice(3)
                        ],
                      },
                    }))
                  }
                >
                  {players.map((user, i) => (
                    <React.Fragment key={i}>
                      {allUsersCards[user.name]
                        ? allUsersCards[user.name].map((card) => (
                            <option
                              key={card.id}
                              value={`ML-${card.id} » ${user.name}`}
                            >
                              ML-{card.id} » {user.name}
                            </option>
                          ))
                        : null}
                    </React.Fragment>
                  ))}
                </select>

                {getCard(
                  activeTransferCards.userActiveCard,
                  userActiveCardRatityBottom,
                  true
                )}

                <div className="arrow-transfers">
                  <img src={arrowTransfers} alt="arrowTransfers" />
                </div>

                {getCard(
                  activeTransferCards.allUsersActiveCard,
                  true,
                  false,
                  <TransferPopover
                    item={activeTransferCards.allUsersActiveCard}
                  />
                )}
              </div>
              <div className="profile-page__bank__transfers__form">
                <p className="transfers-error">{transferError}</p>
                <input
                  placeholder="Сумма перевода..."
                  type="number"
                  name="sum"
                  id="transfer-sum"
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;

                    setInputValue(value);
                    setTransferError(false);

                    if (value > activeTransferCards.userActiveCard.balance) {
                      setTransferError('Недостаточно средств');
                    }

                    if (value <= 0) {
                      setTransferError('Сумма перевода должна быть больше 0');
                    }

                    if (value === '') {
                      setTransferError('Заполните поле');
                    }
                  }}
                />
                <div className="textarea">
                  <textarea
                    placeholder="Комментарий..."
                    name="comment"
                    id="comment"
                    maxLength="250"
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                  <span>{textareaValue.length}/250</span>
                </div>
                <button className="btn transfers-btn" onClick={transferPayload}>
                  {transferLoading ? 'Загрузка' : 'Перевести'}
                </button>
              </div>
            </>
          ) : (
            <h2 className="transfer-loading-error">
              Перезагрузите страницу, и попробуйте снова
            </h2>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileBank;
