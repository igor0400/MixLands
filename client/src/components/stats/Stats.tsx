import { FC } from 'react';

import Graphics from './Graphics';

import './stats.scss';

const Stats: FC = () => {
   return (
      <div className="stats">
         <div className="stats__top-content">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <h2 className="text-center mt-20 text-xl font-black">
               Статистика наших серверов <br /> В реальном времени
            </h2>
            <Graphics />
            <h2 className="text-center mt-12 text-xl font-black">
               Список игроков нашего сервера <br /> В реальном времени
            </h2>
            <h2 className="text-center mt-6 text-lg font-semibold text-gray-500">
               Временно недоступно
            </h2>
         </div>
      </div>
   );
};

export default Stats;
