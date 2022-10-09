import { FC } from 'react';
import { wikiResourcespacks } from '../settings';
import Card from '../card/Card';

const ResourcesPacks: FC = () => {
   return (
      <div className="resourcespacks fade-animation">
         <h3 className="text-center font-bold text-xl mt-3 mb-4">Ресурспаки</h3>
         <div className="cards flex flex-wrap gap-4">
            {wikiResourcespacks.map((item, i) => {
               if (item.name === 'VanillaTweaks') {
                  return <Card key={i} {...item} />;
               }
               return <Card key={i} {...item} />;
            })}
         </div>
      </div>
   );
};

export default ResourcesPacks;
