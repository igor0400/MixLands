import { FC, useState } from 'react';
import { filterButtons } from './settings';

import Graphics from './graphics/Graphics';
import Users from './users/Users';

import './index.scss';

const navClass = 'users-serch__btn px-8 py-2 mt-2 font-semibold rounded-lg';

const Stats: FC = () => {
   const [activeFilter, setActiveFilter] = useState<string>('all');
   const [inputValue, setInputValue] = useState<string>('');

   return (
      <div className="stats fade-animation my-20">
         <h2 className="text-center text-xl font-black">
            Статистика наших серверов <br /> В реальном времени
         </h2>
         <Graphics />
         <h2 className="text-center mt-20 text-xl font-black">
            Список игроков нашего сервера <br /> В реальном времени
         </h2>
         <div className="users-cards container mx-auto px-4 pt-10">
            <div className="users-serch pb-4">
               <div className="users-serch__btns mb-2">
                  {filterButtons.map(({ name, text }, i) => (
                     <button
                        key={i}
                        className={
                           activeFilter === name
                              ? navClass + ' active-nav'
                              : navClass
                        }
                        onClick={() => setActiveFilter(name)}
                     >
                        {text}
                     </button>
                  ))}
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
   );
};

export default Stats;
