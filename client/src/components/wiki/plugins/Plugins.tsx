import { FC } from 'react';
import { wikiPlugins } from '../settings';
import Card from '../card/Card';

const Plugins: FC = () => {
   return (
      <div className="plugins">
         <h3 className="text-center font-bold text-xl mt-3 mb-4">Плагины</h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiPlugins.map((item, i) => (
               <Card key={i} {...item} />
            ))}
         </div>
      </div>
   );
};

export default Plugins;
