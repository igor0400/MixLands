import { Helmet } from 'react-helmet';

const WikiPage = (props) => {
  return (
    <div className="wiki-page mw1400">
      <Helmet>
        <title>{'MixLands > Вики'}</title>
      </Helmet>
      <div className="wiki-page__nav-bar">
        <ul>
          <li
            className={props.activeWiki === 'rules' ? 'wiki-active' : null}
            onClick={() => props.setActiveWiki('rules')}
          >
            Правила
          </li>
          <li
            className={props.activeWiki === 'mechanics' ? 'wiki-active' : null}
            onClick={() => props.setActiveWiki('mechanics')}
          >
            Игровые механики
          </li>
          <li
            className={props.activeWiki === 'faq' ? 'wiki-active' : null}
            onClick={() => props.setActiveWiki('faq')}
          >
            FAQ
          </li>
          <li
            className={props.activeWiki === 'mods' ? 'wiki-active' : null}
            onClick={() => props.setActiveWiki('mods')}
          >
            Моды
          </li>
        </ul>
      </div>
      <div className="wiki-page__main">{props.children}</div>
    </div>
  );
};

export default WikiPage;
