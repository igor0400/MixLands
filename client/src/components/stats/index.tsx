import { FC, useState, useEffect } from 'react';

import Graphics from './graphics/Graphics';
import Users from './users/Users';

import './index.scss';

const activeFilterStyles = { background: '#FF7A00', color: '#fff' };

const Stats: FC = () => {
   const [activeFilter, setActiveFilter] = useState<'all' | 'online'>('all');
   const [inputValue, setInputValue] = useState<string>('');

   return (
      <div className="stats my-20">
         <div className="stats__top-content">
            {/* <div className="bg-ellipse bg-ellipse__orange"></div> */}
            <h2 className="text-center text-xl font-black">
               Статистика наших серверов <br /> В реальном времени
            </h2>
            <Graphics />
            <h2 className="text-center mt-12 text-xl font-black">
               Список игроков нашего сервера <br /> В реальном времени
            </h2>
            <div className="users-cards container mx-auto px-4 pt-6">
               <div className="users-serch pb-5">
                  <div className="users-serch__btns mb-2">
                     <button
                        className="users-serch__btn px-8 py-2 mr-1 font-semibold rounded-lg"
                        onClick={() => setActiveFilter('all')}
                        style={
                           activeFilter === 'all'
                              ? activeFilterStyles
                              : undefined
                        }
                     >
                        Все
                     </button>
                     <button
                        className="users-serch__btn px-8 py-2 font-semibold rounded-lg"
                        onClick={() => setActiveFilter('online')}
                        style={
                           activeFilter === 'online'
                              ? activeFilterStyles
                              : undefined
                        }
                     >
                        Онлайн
                     </button>
                  </div>
                  <input
                     className="users-serch__input w-full py-2 px-3 rounded-md text-lg"
                     type="text"
                     placeholder="Поиск..."
                     onChange={(e) => setInputValue(e.target.value)}
                  />
               </div>
               <Users inputValue={inputValue} activeFilter={activeFilter} />
            </div>
         </div>
      </div>
   );
};

export default Stats;
