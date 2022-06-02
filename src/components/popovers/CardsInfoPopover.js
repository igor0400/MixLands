import { useState, useRef } from 'react';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import BuyCardModal from '../modals/BuyCardModal';
import infoIcon from '../../images/icons/info-icon.svg';
import Spinner from 'react-bootstrap/Spinner';

const CardsInfoPopover = ({
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
  const [imgHover, setImgHover] = useState(false);
  const ref = useRef(null);

  const handlePopoverClick = (event) => {
    setPopoverShow(!popoverShow);
    setTarget(event);
  };

  return (
    <div ref={ref}>
      <img
        src={infoIcon}
        alt="info"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
        onClick={(e) => {
          handlePopoverClick(e.target);
          setPopoverIsBuy(false);
        }}
        id="img-trigger"
      />

      <Overlay
        rootClose={modal || imgHover ? false : true}
        onHide={() => handlePopoverClick(target)}
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
              <button className="btn btn-blue btn-buy">
                <Spinner
                  animation="border"
                  size="sm"
                  variant="light"
                  style={{ margin: '0 50px' }}
                />
              </button>
            ) : popoverIsBuy === 'succses' ? (
              <button className="btn btn-succses btn-buy-succses">
                <div className="animate__animated animate__fadeInLeft">
                  Готово
                </div>
              </button>
            ) : popoverIsBuy === 'error' ? (
              <button className="btn btn-error btn-buy-error">
                <div className="animate__animated animate__fadeInLeft">
                  Ошибка
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

export default CardsInfoPopover;
