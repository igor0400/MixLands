import logo from '../../images/icons/logo-icon.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper mw1400">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="text">
          <p>2022 © MixLands</p>
          <p>Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
