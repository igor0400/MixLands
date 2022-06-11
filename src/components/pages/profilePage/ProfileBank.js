import React, { useEffect, useState } from 'react';
import { database, ref, set } from '../../../firebase/firebase';
import axios from 'axios';

import Card from '../../card/Card';
import CardsInfoPopover from '../../popovers/CardsInfoPopover';
import TransferPopover from '../../popovers/TransferPopover';
import Spinner from 'react-bootstrap/Spinner';

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
   const [transferStatus, setTransferStatus] = useState(false);

   const [activeTransferCards, setActiveTransferCards] = useState({});

   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

   const [userCardsKeys, setUserCardsKeys] = useState(
      user.cards ? Object.keys(user.cards) : null
   );

   const filterDefaultCards = [];
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
         }
      });
   };

   updateAllUsersCards();

   const changeActiveCards = async (setCardNull = false) => {
      const normalUser = JSON.parse(localStorage.getItem('user'));

      await setUserCardsKeys(user.cards ? Object.keys(user.cards) : null);

      const activeTransferAllUsersCard = JSON.parse(
         localStorage.getItem('activeTransferAllUsersCard')
      );

      if (normalUser.cards) {
         setActiveTransferCards((state) => {
            if (userCardsKeys && !setCardNull) {
               return {
                  userActiveCard: state.userActiveCard
                     ? state.userActiveCard
                     : normalUser.cards[userCardsKeys[0]],
                  allUsersActiveCard: activeTransferAllUsersCard,
               };
            } else if (userCardsKeys && setCardNull) {
               return {
                  userActiveCard: normalUser.cards[userCardsKeys[0]],
                  allUsersActiveCard: activeTransferAllUsersCard,
               };
            } else return {};
         });
      }
   };

   useEffect(() => {
      changeActiveCards(true);

      const normalUser = JSON.parse(localStorage.getItem('user'));

      if (userCardsKeys) {
         localStorage.setItem(
            'activeTransferAllUsersCard',
            JSON.stringify({
               ...normalUser.cards[userCardsKeys[0]],
               owner: normalUser.name,
            })
         );
      }

      window.addEventListener('storage', (e) => {
         if (e.key === 'user') {
            localStorage.setItem('user', e.newValue);
            setUser(JSON.parse(localStorage.getItem('user')));
            changeActiveCards(true);
         } else if (e.key === 'activeTransferAllUsersCard') {
            changeActiveCards(true);
         }
      });
   }, []);

   //? BUY CARDS

   function getUserCards() {
      const normalUser = JSON.parse(localStorage.getItem('user'));

      for (let key in normalUser.cards) {
         userCards.push(normalUser.cards[key]);
      }
   }
   getUserCards();

   function getDefaultCards() {
      defaultCards.forEach((item) => {
         if ((user.cards && item.price !== 0) || !user.cards) {
            filterDefaultCards.push(item);
         }
      });
   }

   getDefaultCards();

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

      await set(ref(database, `cards/cardId`), vaidateId(+cardId + 1)).catch(
         () => {
            setIsBuy('error');
            setTimeout(() => handleClose(), 2000);
         }
      );

      await setIsBuy('succses');
      await setTimeout(async () => {
         await getData();
         await getUserCards();
         setModal(false);
      }, 1500);
      setTimeout(() => setIsBuy(false), 2000);
   };

   const postBuyedCardPopover = async (player, buyedCardName, vaidateId) => {
      await setPopoverCardBuyError(false);
      await setPopoverIsBuy('loading');

      await set(ref(database, `users/${player.name}/cards/${cardId}`), {
         name: buyedCardName,
         balance: 0,
         id: cardId,
      });

      await set(ref(database, `cards/cardId`), vaidateId(+cardId + 1))
         .then(async () => {
            await setPopoverIsBuy('succses');

            await setTimeout(async () => {
               await getData();
               await getUserCards();
            }, 1000);
            setTimeout(() => changeActiveCards(), 2000);
         })
         .catch(() => setPopoverIsBuy('error'));

      setTimeout(() => setPopoverIsBuy(false), 1000);
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

         await postBuyedCard(player, value, userCard, buyedCardName, vaidateId);
      } else {
         if (!cardId) {
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

   const changeBalUser = async () => {
      const userCard = activeTransferCards.userActiveCard;
      const allUserCard = activeTransferCards.allUsersActiveCard;
      const normalUser = JSON.parse(localStorage.getItem('user'));

      if (normalUser.name !== allUserCard.owner) {
         await set(
            ref(database, `users/${normalUser.name}/mcoins`),
            +normalUser.mcoins - +inputValue
         )
            .then(() => {
               set(
                  ref(
                     database,
                     `users/${normalUser.name}/cards/${userCard.id}/balance`
                  ),
                  normalUser.cards[userCard.id].balance - +inputValue
               ).catch(() => setTransferError('Ошибка сервера'));
            })
            .catch(() => setTransferError('Ошибка сервера'));
      }

      if (normalUser.name === allUserCard.owner) {
         await set(
            ref(
               database,
               `users/${normalUser.name}/cards/${userCard.id}/balance`
            ),
            +normalUser.cards[userCard.id].balance - +inputValue
         ).catch(() => setTransferError('Ошибка сервера'));
      }
   };

   function plusZero(value) {
      if (value < 10) {
         value = '0' + value;
      }
      return value;
   }

   function getDate() {
      const now = new Date();
      const year = now.getFullYear();
      const day = plusZero(now.getDate());
      const month = plusZero(now.getMonth() + 1);
      const hours = plusZero(now.getHours());
      const minutes = plusZero(now.getMinutes());

      return `${hours}:${minutes} ${day}.${month}.${year}`;
   }

   function getClearDate() {
      const now = new Date();
      const day = plusZero(now.getDate());
      const month = plusZero(now.getMonth() + 1);
      const year = now.getFullYear();
      const hours = plusZero(now.getHours());
      const minutes = plusZero(now.getMinutes());
      const seconds = plusZero(now.getSeconds());

      return `${year}${month}${day}${hours}${minutes}${seconds}`;
   }

   const changeBalPlayer = async () => {
      const allUserCard = JSON.parse(
         localStorage.getItem('activeTransferAllUsersCard')
      );
      const normalUser = JSON.parse(localStorage.getItem('user'));

      await getData();

      await players.forEach(async (player) => {
         if (
            player.name === allUserCard.owner &&
            normalUser.name !== allUserCard.owner
         ) {
            await set(
               ref(database, `users/${player.name}/mcoins`),
               +player.mcoins + +inputValue
            )
               .then(() => {
                  set(
                     ref(
                        database,
                        `users/${player.name}/cards/${allUserCard.id}/balance`
                     ),
                     +allUserCard.balance + +inputValue
                  ).catch(() => setTransferError('Ошибка сервера'));
                  localStorage.setItem(
                     'activeTransferAllUsersCard',
                     JSON.stringify({
                        ...allUserCard,
                        balance: +allUserCard.balance + +inputValue,
                     })
                  );

                  // ОТПРАВКА УВЕДОМЛЕНИЙ
                  const notificationData = {
                     date: getDate(),
                     clearDate: getClearDate(),
                     senderCard: {
                        ...activeTransferCards.userActiveCard,
                        owner: user.name,
                     },
                     message: textareaValue === '' ? null : textareaValue,
                     recipientCard: allUserCard,
                     sum: +inputValue,
                  };

                  axios.post(
                     `https://mixlands-3696a-default-rtdb.firebaseio.com/users/${player.name}/notifications/new.json`,
                     notificationData
                  );
               })
               .catch(() => setTransferError('Ошибка сервера'));
         }

         if (
            player.name === allUserCard.owner &&
            normalUser.name === allUserCard.owner
         ) {
            await set(
               ref(
                  database,
                  `users/${player.name}/cards/${allUserCard.id}/balance`
               ),
               +allUserCard.balance + +inputValue
            )
               .then(() => {
                  localStorage.setItem(
                     'activeTransferAllUsersCard',
                     JSON.stringify({
                        ...allUserCard,
                        balance: +allUserCard.balance + +inputValue,
                     })
                  );
               })
               .catch(() => setTransferError('Ошибка сервера'));
         }
      });
   };

   const transferPayload = async () => {
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

      setTransferStatus('loading');

      await changeBalUser();
      await changeBalPlayer();

      await getData();

      await setActiveTransferCards((state) => ({
         ...state,
         userActiveCard: {
            ...state.userActiveCard,
            balance:
               +JSON.parse(localStorage.getItem('user')).cards[
                  state.userActiveCard.id
               ].balance - +inputValue,
         },
      }));

      await players.forEach((item) => {
         const cards = item.cards;

         if (item.name === allUserCard.owner) {
            for (let key in cards) {
               if (allUserCard.id === key) {
                  setActiveTransferCards((state) => ({
                     ...state,
                     allUsersActiveCard: {
                        ...state.allUsersActiveCard,
                        balance:
                           +cards[state.allUsersActiveCard.id].balance +
                           +inputValue,
                     },
                  }));
               }
            }
         }
      });

      await setTransferStatus('succses');
      setTimeout(() => setTransferStatus(false), 2000);

      input.value = '';
      textarea.value = '';
      setInputValue('');
      setTextareaValue('');
      await getData();
   };

   const userActiveCardRatityBottom = () => {
      if (activeTransferCards.userActiveCard.balance <= 6400) return true;
      else return false;
   };

   return (
      <div className="profile-page__bank animate__animated animate__fadeIn duration05">
         <div className="profile-page__bank__navs">
            <button
               onClick={() => setBankContent('userCards')}
               className={bankContent === 'userCards' ? 'nav-active' : null}
            >
               Ваши карты
            </button>
            <button
               onClick={() => {
                  changeActiveCards(true);
                  setBankContent('transfers');
               }}
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
                  JSON.parse(localStorage.getItem('user')).cards ? (
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
                                 ratityBottom={
                                    item.balance > 6400 ? false : true
                                 }
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
               activeTransferCards.allUsersActiveCard &&
               userCardsKeys ? (
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
                           value={`ML-${activeTransferCards.allUsersActiveCard.id} » ${activeTransferCards.allUsersActiveCard.owner}`}
                           onChange={async (e) => {
                              await localStorage.setItem(
                                 'activeTransferAllUsersCard',
                                 JSON.stringify({
                                    owner: e.target.value.split(' ')[2],
                                    ...objPlayers[e.target.value.split(' ')[2]]
                                       .cards[
                                       e.target.value.split(' ')[0].slice(3)
                                    ],
                                 })
                              );
                              await changeActiveCards();
                           }}
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

                              if (
                                 value >
                                 activeTransferCards.userActiveCard.balance
                              ) {
                                 setTransferError('Недостаточно средств');
                              }

                              if (value <= 0) {
                                 setTransferError(
                                    'Сумма перевода должна быть больше 0'
                                 );
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
                              onChange={(e) =>
                                 setTextareaValue(e.target.value + '')
                              }
                           />
                           <span>{textareaValue.length}/250</span>
                        </div>
                        {transferStatus === 'loading' ? (
                           <button className="btn transfers-btn">
                              <Spinner
                                 animation="border"
                                 variant="light"
                                 size="sm"
                              />
                           </button>
                        ) : transferStatus === 'succses' ? (
                           <button className="btn btn-succses-green">
                              <p className="animate__animated animate__fadeInDown">
                                 Готово
                              </p>
                           </button>
                        ) : (
                           <button
                              className="btn transfers-btn"
                              onClick={transferPayload}
                           >
                              Перевести
                           </button>
                        )}
                     </div>
                  </>
               ) : !userCardsKeys ? (
                  <h2 className="transfer-loading-error">
                     Оформите карту для того чтобы начать переводить
                  </h2>
               ) : (
                  <h2 className="transfer-loading-error">
                     Перейдите в другой раздел, и попробуйте снова
                  </h2>
               )}
            </div>
         ) : null}
      </div>
   );
};

export default ProfileBank;
