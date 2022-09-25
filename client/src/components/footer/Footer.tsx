import { FC } from 'react';

import './footer.scss';

const Footer: FC = () => {
   return (
      <footer className="footer flex blur-dark-bg">
         <div className="footer__wrapper flex justify-between container mx-auto p-4">
            <div className="footer__start flex">
               <div className="copyrite pr-12">
                  <h4 className="text-lg font-black">MixLands © 2022</h4>
                  <p>Все права защищены.</p>
               </div>
               <div className="contacts pr-12">
                  <h4 className="text-lg font-black">Контакты:</h4>
                  <p>
                     E-Mail: <b>support@mixlands.space</b>
                  </p>
               </div>
               <div className="discord pr-12">
                  <h4 className="text-lg font-black">Нас можно найти в:</h4>
                  <a
                     href="https://discord.gg/sdVdG32d"
                     className="text-blue-600/100"
                  >
                     discord.gg/sdVdG32d
                  </a>
               </div>
            </div>
            <div className="footer__end">
               <div className="offert pr-12">
                  <h4 className="text-lg font-black">Договор оферты</h4>
                  <a
                     href="https://mixlands.space/#/offer"
                     className="text-blue-600/100"
                  >
                     mixlands.space/#/offer
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
