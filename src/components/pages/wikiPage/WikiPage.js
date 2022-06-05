import { Helmet } from 'react-helmet';
import { useState } from 'react';

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
      <div className="wiki-page mw1400 animate__animated animate__fadeIn">
         <Helmet>
            <title>{'MixLands > Вики'}</title>
         </Helmet>
         <div className="wiki-page__nav-bar">
            <ul>
               <li
                  className={
                     activeWiki === 'rules' ? 'wiki-active' : null
                  }
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
                  className={
                     activeWiki === 'packs' ? 'wiki-active' : null
                  }
                  onClick={() => setActiveWiki('packs')}
               >
                  Текстурпак
               </li>
            </ul>
         </div>
         <div className="wiki-page__main">{returnWikiElem()}</div>
      </div>
   );
};

export default WikiPage;
