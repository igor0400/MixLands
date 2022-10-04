import { FC } from 'react';
import { wikiServers } from '../settings';
import Card from '../card/Card';

const Servers: FC = () => {
   return (
      <div className="servers">
         <h3 className="text-center font-bold text-xl mt-3 mb-4">Плагины</h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiServers.map((item, i) => (
               <Card key={i} {...item} full />
            ))}
         </div>
      </div>
   );
};

export default Servers;
