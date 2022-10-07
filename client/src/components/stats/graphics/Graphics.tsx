import { FC } from 'react';
import { useGetOnlineCountQuery } from '../../../slices/serverInfoSlice';

import OnlineChart from '../../charts/OnlineChart.jsx';

import logo from '../../../images/icons/logo.png';

import './graphics.scss';

interface serverType {
   name: string;
   info: any;
   textClass: string;
   disableGraphic?: boolean;
}

const defaultInfo = {
   players: {
      online: 0,
      max: 200,
   },
};

const Graphics: FC = () => {
   const { data: rolePlayInfo = defaultInfo } = useGetOnlineCountQuery(
      'roleplay',
      {
         selectFromResult: ({ data }) => ({ data }),
      }
   );
   const { data: creativeInfo = defaultInfo } = useGetOnlineCountQuery(
      'creative',
      {
         selectFromResult: ({ data }) => ({ data }),
      }
   );
   const { data: adventureInfo = defaultInfo } = useGetOnlineCountQuery(
      'adventure',
      {
         selectFromResult: ({ data }) => ({ data }),
      }
   );

   const servers = [
      {
         name: 'roleplay',
         info: rolePlayInfo,
         textClass: 'orange-text',
         disableGraphic: false,
      },
      {
         name: 'creative',
         info: creativeInfo,
         textClass: 'green-text',
         disableGraphic: false,
      },
      {
         name: 'adventure',
         info: adventureInfo,
         textClass: 'purple-text',
         disableGraphic: false,
      },
   ];

   return (
      <div className="graphics flex flex-wrap justify-center my-10">
         <div className="bg-ellipse bg-ellipse__orange"></div>

         {servers.map(
            (
               { name, info, textClass, disableGraphic }: serverType,
               i: number
            ) => (
               <div className="graphic__wrapper" key={i}>
                  <div className="graphic__descr flex justify-between p-7">
                     <div className="graphic__descr__title flex">
                        <div>
                           <img src={logo} alt="logo" className="h-10" />
                        </div>
                        <p
                           className={`uppercase font-bold px-1 text-sm ${textClass}`}
                        >
                           {name}
                        </p>
                     </div>
                     <div className="graphic__descr__online">
                        <p className="title font-bold">Онлайн:</p>
                        <p>
                           {info.online || 0}/{defaultInfo.players.max}
                        </p>
                     </div>
                  </div>
                  {disableGraphic ? (
                     <p className="w-full h-32 flex justify-center items-center text-gray-400">
                        Временно недоступно
                     </p>
                  ) : (
                     <div className="graphic__chart">
                        <OnlineChart server={name} />
                     </div>
                  )}
               </div>
            )
         )}
      </div>
   );
};

export default Graphics;
