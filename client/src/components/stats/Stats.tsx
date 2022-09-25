import { FC } from 'react';

import OnlineChart from '../charts/OnlineChart';

import logo from '../../images/icons/logo.png';

import './stats.scss';

const Stats: FC = () => {
   return (
      <div className="stats">
         <div className="stats__top-content">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <h2 className="text-center mt-20 text-xl font-black">
               Статистика наших серверов <br /> В реальном времени
            </h2>
            <div className="stats__top-content__graphics grid justify-center my-10">
               <div className="ml-roleplay graphic__wrapper">
                  <div className="graphic__descr flex justify-between p-7">
                     <div className="graphic__descr__title flex">
                        <div>
                           <img src={logo} alt="logo" className="h-10" />
                        </div>
                        <p className="uppercase font-bold px-1 text-sm green-text">
                           roleplay
                        </p>
                     </div>
                     <div className="graphic__descr__online">
                        <p className="title font-bold">Онлайн:</p>
                        <p>34/100</p>
                     </div>
                  </div>
                  <div className="graphic__chart">
                     <OnlineChart />
                  </div>
               </div>
               <div className="ml-creative graphic__wrapper">
                  <div className="graphic__descr flex justify-between p-7">
                     <div className="graphic__descr__title flex">
                        <div>
                           <img src={logo} alt="logo" className="h-10" />
                        </div>
                        <p className="uppercase font-bold px-1 text-sm orange-text">
                           creative
                        </p>
                     </div>
                     <div className="graphic__descr__online">
                        <p className="title font-bold">Онлайн:</p>
                        <p>3/20</p>
                     </div>
                  </div>
                  <div className="graphic__chart">
                     <OnlineChart />
                  </div>
               </div>
            </div>
            <h2 className="text-center mt-12 text-xl font-black">
               Список игроков нашего сервера <br /> В реальном времени
            </h2>
         </div>
      </div>
   );
};

export default Stats;
