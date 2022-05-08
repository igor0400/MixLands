import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import StatsPage from '../pages/StatsPage';
import WikiPage from '../pages/wikiPage/WikiPage';
import WikiRules from '../pages/wikiPage/WikiRules';
import WikiMechanics from '../pages/wikiPage/WikiMechanics';
import Footer from '../footer/Footer';

import '../../styles/App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>MixLands</title>
        </Helmet>
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="wiki">
              <Route
                path="rules"
                element={
                  <WikiPage>
                    <WikiRules />
                  </WikiPage>
                }
              ></Route>
              <Route
                path="mechanics"
                element={
                  <WikiPage>
                    <WikiMechanics />
                  </WikiPage>
                }
              ></Route>
              <Route
                path="faq"
                element={
                  <WikiPage>
                    <h1>Hello</h1>
                  </WikiPage>
                }
              ></Route>
              <Route
                path="mods"
                element={
                  <WikiPage>
                    <h1>Hello</h1>
                  </WikiPage>
                }
              ></Route>
            </Route>
            <Route path="shop" element={<h1>shop</h1>} />
            <Route path="*" element={<h1>404 page</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
