import { FC } from 'react';
import {
   wikiMods,
   wikiClients,
   wikiModsBuilds,
} from '../settings';
import Card from '../card/Card';

import './mods.scss';

const Mods: FC = () => {
   return (
      <div className="mods fade-animation">
         <h3 className="text-center font-bold text-xl mt-3 mb-4">Моды</h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiMods.map((item, i) => (
               <Card key={i} {...item} />
            ))}
         </div>
         <h3 className="text-center font-bold text-xl mt-8 mb-4">Клиенты</h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiClients.map((item, i) => (
               <Card key={i} {...item} />
            ))}
         </div>
         <h3 className="text-center font-bold text-xl mt-8 mb-4">
            Сборки модов
         </h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiModsBuilds.map((item, i) => (
               <Card key={i} {...item} />
            ))}
         </div>
      </div>
   );
};

export default Mods;
