import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import OnlineChart from '../../charts/OnlineChart.jsx';

import logo from '../../../images/icons/logo.png';

import './graphics.scss';

import data from '../../../config.json';

interface onlineType {
   online: number;
   maxOnline: number;
}

const { statsServer } = data;

const Graphics: FC = () => {
   const [onlineRoleplay, setOnlineRoleplay] = useState<onlineType>({
      online: 0,
      maxOnline: 0,
   });

   useEffect(() => {
      axios.get(`https://api.mcsrvstat.us/2/${statsServer}`).then((res) => {
         if (res.data?.players) {
            setOnlineRoleplay({
               online: res.data.players.online,
               maxOnline: res.data.players.max,
            });
         }
      });
   }, []);

   return (
      <>
         <div className="graphics flex flex-wrap justify-center my-10">
            <div className="ml-roleplay graphic__wrapper">
               <div className="graphic__descr flex justify-between p-7">
                  <div className="graphic__descr__title flex">
                     <div>
                        <img src={logo} alt="logo" className="h-10" />
                     </div>
                     <p className="uppercase font-bold px-1 text-sm orange-text">
                        roleplay
                     </p>
                  </div>
                  <div className="graphic__descr__online">
                     <p className="title font-bold">Онлайн:</p>
                     <p>
                        {onlineRoleplay.online}/{onlineRoleplay.maxOnline}
                     </p>
                  </div>
               </div>
               <div className="graphic__chart">
                  <OnlineChart />
               </div>
            </div>
            <div className="ml-creative graphic__wrapper">
               <div className="graphic__descr flex justify-between p-7">
                  <div className="graphic__descr__title flex">
                     <div>
                        <img src={logo} alt="logo" className="h-10" />
                     </div>
                     <p className="uppercase font-bold px-1 text-sm green-text">
                        creative
                     </p>
                  </div>
                  <div className="graphic__descr__online">
                     <p className="title font-bold">Онлайн:</p>
                     <p>0/0</p>
                  </div>
               </div>
               <p className="w-full h-32 flex justify-center items-center text-gray-400">
                  Временно недоступно
               </p>
            </div>
            <div className="ml-adventure graphic__wrapper">
               <div className="graphic__descr flex justify-between p-7">
                  <div className="graphic__descr__title flex">
                     <div>
                        <img src={logo} alt="logo" className="h-10" />
                     </div>
                     <p className="uppercase font-bold px-1 text-sm purple-text">
                        adventure
                     </p>
                  </div>
                  <div className="graphic__descr__online">
                     <p className="title font-bold">Онлайн:</p>
                     <p>0/0</p>
                  </div>
               </div>
               <p className="w-full h-32 flex justify-center items-center text-gray-400">
                  Временно недоступно
               </p>
            </div>
         </div>
      </>
   );
};

export default Graphics;
