import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

function BuyCardModal({
  show,
  handleClose,
  userCards,
  cardBuyError,
  setCardBuyError,
  specialCards,
  defaultCards,
  getBalance,
  buyCard,
  user,
  buyedCard,
  setModal,
  isBuy,
  setIsBuy,
}) {
  const [activeBankCard, setActiveBankCard] = useState(false);

  return (
    <Modal
      show={show === 'buyCard' ? true : false}
      onHide={handleClose}
      className="default__modal"
    >
      <Modal.Header>
        <div></div>
        <Modal.Title>Выберите карту</Modal.Title>
        <CloseButton variant="white" onClick={handleClose} />
      </Modal.Header>

      <div className="modal-body">
        {userCards.length === 0 ? (
          <h3 className="if-cards-0">
            Для начала надо оформить бесплатную карту
          </h3>
        ) : (
          <div className="user-cards">
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
                  className={
                    activeBankCard && activeBankCard.id === item.id
                      ? 'bank-card bank-card__active'
                      : 'bank-card'
                  }
                  key={item.id}
                  style={{
                    background: `100% center / cover no-repeat url(${cardName.imgUrl})`,
                  }}
                  onClick={() => {
                    setActiveBankCard(item);
                    setCardBuyError(false);
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
        )}
      </div>

      <Modal.Footer>
        <p className="card-buy-error">{cardBuyError}</p>
        {isBuy === 'loading' ? (
          <button className="btn btn-blue">
            <Spinner
              animation="border"
              size="sm"
              variant="light"
              style={{ margin: '0 25px' }}
            />
          </button>
        ) : isBuy === 'succses' ? (
          <button
            className="btn btn-succses"
            onClick={() => {
              setModal(false);
              setIsBuy(false);
              
            }}
          >
            <div className="animate__animated animate__fadeInLeft">Готово</div>
          </button>
        ) : isBuy === 'error' ? (
          <button className="btn btn-error btn-buy-error">
            <div className="animate__animated animate__fadeInLeft">Ошибка</div>
          </button>
        ) : (
          <button
            className="btn btn-blue"
            onClick={() => {
              if (activeBankCard) {
                buyCard(user, buyedCard.price, buyedCard.name, activeBankCard);
              } else if (!activeBankCard) {
                setCardBuyError('Вы не выбрали карту!');
              }
            }}
          >
            Купить
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default BuyCardModal;
