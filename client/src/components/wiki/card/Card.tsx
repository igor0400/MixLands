import { FC } from 'react';
import download from '../../../images/icons/download.png';

import './card.scss';

interface modeCardType {
   name: string;
   descr: string;
   link?: string;
   full?: boolean;
}

const ModeCard: FC<modeCardType> = ({ name, descr, link, full }) => {
   return (
      <div
         className="wiki-card rounded-lg p-3 flex flex-column"
         style={typeof full === 'boolean' ? { width: 'auto' } : undefined}
      >
         <h4 className="font-black text-lg mb-1">{name}</h4>
         <p className="mb-2 text-base">{descr}</p>
         {typeof link == 'string' ? (
            <div className="flex mt-auto">
               <a href={link} className="flex font-black text-sm">
                  <div className="flex items-center mr-1">
                     <img src={download} alt="download" />
                  </div>
                  Скачать
               </a>
            </div>
         ) : null}
      </div>
   );
};

export default ModeCard;
