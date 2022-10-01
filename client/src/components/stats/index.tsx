import { FC } from 'react';

import Graphics from './graphics/Graphics';
import Users from './users/Users';

import './stats.scss';

const Stats: FC = () => {
   return (
      <div className="stats my-20">
         <div className="stats__top-content">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <h2 className="text-center text-xl font-black">
               Статистика наших серверов <br /> В реальном времени
            </h2>
            <Graphics />
            <h2 className="text-center mt-12 text-xl font-black">
               Список игроков нашего сервера <br /> В реальном времени
            </h2>
            <div className="users-cards container mx-auto px-4 pt-10">
               <div className="users-serch"></div>
               <Users />
            </div>
         </div>
      </div>
   );
};

export default Stats;
