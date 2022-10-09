import { FC } from 'react';
import { cardsItems } from './settings';

import tower from '../../images/tower.png';
import allay from '../../images/allay.png';
import warden from '../../images/warden.png';

import './home.scss';

const Home: FC = () => {
   return (
      <div className="home fade-animation">
         <div className="home__top-content relative">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <div className="towel-content flex justify-between 2xl:justify-center items-center container mx-auto px-4">
               <div className="towel-content__descr mr-10 xl:mr-0">
                  <h1 className="text-5xl font-black mb-2">
                     Высокотехнологичный ванильный <br /> сервер Minecraft.
                  </h1>
                  <p className="font-semibold py-4">
                     Выживайте, отыгрывайте RolePlay, стройте города и ищите
                     друзей.
                  </p>
                  <div className="towel-content__descr__list">
                     <p>
                        Наслаждайтесь игрой в присутствии государственных
                        проектов:
                     </p>
                     <ul>
                        <li>
                           <b>Спавн</b> - место, где спавнятся новички и
                           проводятся РП ивенты.
                        </li>
                        <li>
                           <b>Хаб</b> - лобби в аду для быстрого и удобного
                           перемещения.
                        </li>
                        <li>
                           <b>Энд</b> - проект, который вмещает в себя рынок и
                           ТФ.
                        </li>
                     </ul>
                  </div>
                  <div className="towel-content__descr__btns flex pt-5">
                     <a
                        className="default-btn white-btn"
                        href="https://discord.gg/g487w5cCQz"
                        target="_blank"
                     >
                        Купить вход за 299₽
                     </a>
                     <a
                        className="default-btn none-bg-btn ml-4"
                        href="https://discord.gg/g487w5cCQz"
                        target="_blank"
                     >
                        Discord
                     </a>
                  </div>
                  <p className="font-normal pt-4">
                     Пиратка или лицензия 1.19.2
                  </p>
               </div>
               <div className="bg-tower">
                  <img src={tower} alt="tower" />
               </div>
            </div>
            <div className="allay-content blur-dark-bg">
               <div className="allay-content__wrapper container mx-auto py-12 px-4">
                  <img src={allay} alt="allay" />
                  <h2 className="text-center text-2xl font-black pb-4">
                     Сервер, который основан на Облачных Технологиях
                  </h2>
                  <p className="text-center text-sm ">
                     Онлайн оплата штрафа, подача дела на суд, банк. Социальная
                     сеть, профили игроков и многое другое{' '}
                     <b>присутствует у нас</b>.
                  </p>
               </div>
            </div>
         </div>

         <div className="home__center-content relative">
            <div className="bg-ellipse bg-ellipse__yellow"></div>
            <div className="home__center-content__cards container mx-auto px-4 justify-center grid gap-20">
               {cardsItems.map(({ iconUrl, title, text }, i) => (
                  <div
                     key={i}
                     className="blur-dark-bg p-8 rounded-3xl text-center"
                  >
                     <img
                        className="w-14 h-14 mx-auto"
                        src={iconUrl}
                        alt={title}
                     />
                     <h3 className="py-3 text-xl font-black">{title}</h3>
                     <p className="text-sm">{text}</p>
                  </div>
               ))}
            </div>
            <div className="home__center-content__welcome blur-dark-bg">
               <div className="home__center-content__welcome__wrapper container mx-auto py-20 px-4">
                  <h2 className="text-center text-2xl font-black pb-4">
                     Заинтересовали?
                  </h2>
                  <p className="text-center text-sm">
                     Приходите играть к нам! Мы обеспечим Вам комфортную игру и
                     предоставим лучшие эмоции от нашего коллектива! В случае,
                     если Вас не устроит сервер, его комьюнити и тому подобное -
                     мы вернём Вам средства.
                  </p>
               </div>
            </div>
         </div>

         <div className="home__bottom-content relative">
            <div className="bg-ellipse bg-ellipse__green"></div>
            <p className="mx-auto max-w-2xl text-center py-20">
               Администрация проекта MixLands старается для Вас, что бы принести
               максимально комфортную игру. Мы ценим абсолютно каждого нашего
               игрока, поэтому просим Вас, пожалуйста, не нарушайте правила, тем
               самым Вы проявите ответное уважение к нам, а так же предоставите
               меньше работы как для администрации, так и для модерации.
            </p>
            <img className="bg-warder" src={warden} alt="warden" />
         </div>
      </div>
   );
};

export default Home;
