import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WikiPage = (props) => {
  return (
    <div className="wiki-page mw1400">
      <Helmet>
        <title>{'MixLands > Вики'}</title>
      </Helmet>
      <div className="wiki-page__nav-bar">
        <ul>
          <NavLink
            to="/wiki/rules"
            className={({ isActive }) => (isActive ? 'wiki-active' : null)}
          >
            <li>Правила</li>
          </NavLink>
          <NavLink
            to="/wiki/mechanics"
            className={({ isActive }) => (isActive ? 'wiki-active' : null)}
          >
            <li>Игровые механики</li>
          </NavLink>
          <NavLink
            to="/wiki/faq"
            className={({ isActive }) => (isActive ? 'wiki-active' : null)}
          >
            <li>FAQ</li>
          </NavLink>
          <NavLink
            to="/wiki/mods"
            className={({ isActive }) => (isActive ? 'wiki-active' : null)}
          >
            <li>Моды</li>
          </NavLink>
        </ul>
      </div>
      <div className="wiki-page__main">{props.children}</div>
    </div>
  );
};

export default WikiPage;
