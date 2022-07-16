import { getBalance } from '../../service/getBalance';

const Card = ({ item, icon, cardName, ratityBottom, showBalance }) => {
   const ratity = (ml) => (
      <div className="bank-card__bottom__ratity">
         {ml ? (
            <p
               style={{
                  color: item.color ? item.color : '#fff',
                  marginBottom: '5px',
               }}
            >
               ML
            </p>
         ) : null}
         <p style={{ color: item.color ? item.color : '#fff' }}>
            {cardName ? cardName.ratity : item.ratity}
         </p>
      </div>
   );

   return (
      <div
         className={ratityBottom ? 'bank-card ratity-bottom' : 'bank-card'}
         style={{
            background: cardName
               ? `100% center / cover no-repeat url(${cardName.imgUrl})`
               : `100% center / cover no-repeat url(${item.imgUrl})`,
         }}
      >
         <div className="bank-card__top">
            <div className="bank-card__top__title">
               <p style={{ color: item.color ? item.color : '#fff' }}>
                  ML{item.id ? ` - ${item.id}` : null}
               </p>
               {ratityBottom ? null : ratity()}
            </div>
            {icon ? <div className="bank-card__top__icon">{icon}</div> : null}
         </div>
         <div style={{ flex: '1 1 auto' }}></div>
         <div className="bank-card__bottom">
            {ratityBottom ? ratity(true) : null}
            <div className="bank-card__bottom__price">
               {item.price !== undefined ? (
                  <p>
                     Цена:{' '}
                     {item.price === 0 ? 'Бесплатно' : getBalance(item.price)}
                  </p>
               ) : null}
               {showBalance && item.balance !== undefined ? (
                  <p
                     style={{ color: item.color ? item.color : '#fff' }}
                     className="balance"
                  >
                     Баланс: {getBalance(item.balance)}
                  </p>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default Card;
