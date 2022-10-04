import { FC, useState } from 'react';

import Rules from './rules/Rules';
import Faq from './faq/Faq';
import Mods from './mods/Mods';
import ResourcesPacks from './resourcesPacks/ResourcesPacks';
import Plugins from './plugins/Plugins';
import Servers from './servers/Servers';

import './index.scss';

const navClass =
   'px-20 py-3 text-center rounded-lg duration-300 cursor-pointer font-medium';

const navs = [
   { name: 'rules', text: 'Правила', component: <Rules /> },
   { name: 'faq', text: 'FAQ', component: <Faq /> },
   { name: 'mods', text: 'Моды', component: <Mods /> },
   {
      name: 'resourcespacks',
      text: 'Ресурспаки',
      component: <ResourcesPacks />,
   },
   { name: 'plugins', text: 'Плагины', component: <Plugins /> },
   { name: 'servers', text: 'Наши сервера', component: <Servers /> },
];

function getContent(active: string) {
   let content: JSX.Element | undefined = undefined;

   navs.forEach((item) => {
      if (item.name === active) {
         content = item.component;
      }
   });

   return content;
}

const Wiki: FC = () => {
   const [activeWiki, setActiveWiki] = useState<string>('rules');

   return (
      <div className="wiki fade-animation">
         <div className="bg-ellipse bg-ellipse__orange"></div>
         <div className="wiki__wrapper flex max-w-7xl mx-auto my-10">
            <div className="wiki__nav-bar">
               <ul>
                  {navs.map(({ name, text }, i) => (
                     <li
                        className={
                           activeWiki === name
                              ? navClass + ' active-nav'
                              : navClass
                        }
                        onClick={() => setActiveWiki(name)}
                        key={i}
                     >
                        {text}
                     </li>
                  ))}
               </ul>
            </div>
            <div className="wiki__content w-full pl-20">
               {getContent(activeWiki)}
            </div>
         </div>
      </div>
   );
};

export default Wiki;
