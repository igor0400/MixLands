import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import StatsPage from '../pages/StatsPage';
import Footer from '../footer/Footer';

import '../../styles/App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="wiki" element={<h1>wiki</h1>} />
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
