import { useState } from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArticleIcon from '@mui/icons-material/Article';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizIcon from '@mui/icons-material/Quiz';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import WikiRules from './WikiRules';
import WikiMechanics from './WikiMechanics';
import WikiFaq from './WikiFaq';
import WikiMods from './WikiMods';
import WikiPacks from './WikiPacks';

const WikiPage = () => {
   const [activeWiki, setActiveWiki] = useState('rules');

   function returnWikiElem() {
      switch (activeWiki) {
         case 'rules':
            return <WikiRules />;
         case 'mechanics':
            return <WikiMechanics />;
         case 'faq':
            return <WikiFaq />;
         case 'mods':
            return <WikiMods />;
         case 'packs':
            return <WikiPacks />;
      }
   }

   return (
      <div className="wiki-page animate__animated animate__fadeIn">
         <div className="wiki-page__wrapper mw1400">
            <div className="wiki-page__nav-bar">
               <ul>
                  <li
                     className={activeWiki === 'rules' ? 'wiki-active' : null}
                     onClick={() => setActiveWiki('rules')}
                  >
                     Правила
                  </li>
                  <li
                     className={
                        activeWiki === 'mechanics' ? 'wiki-active' : null
                     }
                     onClick={() => setActiveWiki('mechanics')}
                  >
                     Игровые механики
                  </li>
                  <li
                     className={activeWiki === 'faq' ? 'wiki-active' : null}
                     onClick={() => setActiveWiki('faq')}
                  >
                     FAQ
                  </li>
                  <li
                     className={activeWiki === 'mods' ? 'wiki-active' : null}
                     onClick={() => setActiveWiki('mods')}
                  >
                     Моды
                  </li>
                  <li
                     className={activeWiki === 'packs' ? 'wiki-active' : null}
                     onClick={() => setActiveWiki('packs')}
                  >
                     Текстурпак
                  </li>
               </ul>
            </div>
            <div className="wiki-page__main">{returnWikiElem()}</div>
         </div>
         <div className="wiki-page__nav-bar__media">
            <LabelBottomNavigation setActiveWiki={setActiveWiki} />
         </div>
      </div>
   );
};

function LabelBottomNavigation({ setActiveWiki }) {
   const [value, setValue] = useState('rules');

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const buttons = [
      { label: 'правила', value: 'rules', icon: <ArticleIcon /> },
      {
         label: 'механики',
         value: 'mechanics',
         icon: <SportsEsportsIcon />,
      },
      { label: 'FAQ', value: 'faq', icon: <QuizIcon /> },
      { label: 'моды', value: 'mods', icon: <AccountTreeIcon /> },
      { label: 'текстурпаки', value: 'packs', icon: <AutoAwesomeIcon /> },
   ];

   return (
      <BottomNavigation
         value={value}
         onChange={handleChange}
         style={{ background: 'rgb(33, 30, 41)', height: '70px' }}
      >
         {buttons.map((item, i) => (
            <BottomNavigationAction
               label={item.label}
               value={item.value}
               icon={item.icon}
               onClick={() => setActiveWiki(item.value)}
               style={{ minWidth: '64px' }}
               key={i}
            />
         ))}
      </BottomNavigation>
   );
}

export default WikiPage;
