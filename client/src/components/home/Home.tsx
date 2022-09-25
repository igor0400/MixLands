import { FC } from 'react';

import tower from '../../images/tower.png';
import allay from '../../images/allay.png';

import bank from '../../images/icons/bank.svg';
import plyments from '../../images/icons/payments.svg';
import court from '../../images/icons/court.svg';
import profile from '../../images/icons/profile.svg';
import sync from '../../images/icons/sync.svg';
import security from '../../images/icons/security.svg';
import warden from '../../images/warden.png';

import './home.scss';

const cardsItems = [
   {
      iconUrl: bank,
      title: 'Онлайн банк',
      text: 'Система, которая позволит игрокам торговаться в разы легче, а так же сберегать свои деньги, не боясь за них. За все Ваши средства, которые находятся на балансе банка отвечает государство, в случае их потери будет возмещение.',
   },
   {
      iconUrl: plyments,
      title: 'Онлайн выплаты',
      text: 'Благодаря этой системе Вы сможете в любой момент выплатить штраф/налог/пожертвование онлайн, при этом всём все переводы проходят без комиссии, что позволяет минимализировать любые неудобства и претензии.',
   },
   {
      iconUrl: court,
      title: 'Онлайн суды',
      text: 'Ещё одна крутая фишка, с помощью которой можно подать дело в суд онлайн. Навредил игрок? Оставьте заявку с доказательствами на сайте, после чего Ваше дело будет рассмотрено и решено в голосовом судебном канале.',
   },
   {
      iconUrl: profile,
      title: 'Социальная сеть',
      text: 'Наш проект основан на облачных технологиях, исходя из этого у нас есть своя социальная сеть, Вы можете в любой момент посмотреть профиль другого игрока и даже почитать его посты.',
   },
   {
      iconUrl: sync,
      title: 'Синхронизация',
      text: 'Игровой сервер полностью синхронизирован с Discord и нашим сайтом. Ваш игровой аккаунт (пароль, никнейм) полностью отвечают данным на сайте, исходя из этого Вы можете войти в свой аккаунт на сайте под игровыми данными.',
   },
   {
      iconUrl: security,
      title: 'Безопасность',
      text: 'Абсолютно все Ваши данные хранятся в полной безопасности, у нас присутствует самописное шифрование конфиденциальности, из-за чего никакой злоумышленник не сможет украсть Ваш пароль и тому подобное.',
   },
];

const Home: FC = () => {
   return (
      <div className="home">
         <div className="home__top-content relative">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <div className="towel-content flex justify-between 2xl:justify-center items-center container mx-auto px-4">
               <div className="towel-content__descr">
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
                     <button className="btn white-btn">
                        Купить вход за 299₽
                     </button>
                     <button className="btn none-bg-btn ml-4">Discord</button>
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
               максимально комфортную игру для Вас. <br /> Мы ценим абсолютно
               каждого нашего игрока, поэтому просим Вас, пожалуйста, не
               нарушайте правила, тем самым Вы проявите ответное уважение к нам,
               а так же предоставите меньше работы как для администрации, так и
               для модерации.
            </p>
            <img className="bg-warder" src={warden} alt="warden" />
         </div>
      </div>
   );
};

export default Home;
