import BuyModal from './BuyModal';
import LoginModal from './LoginModal';
import SkinModal from './SkinModal';

const Modals = ({ show, handleClose, players }) => {
  return (
    <>
      <BuyModal show={show} handleClose={handleClose} />
      <LoginModal show={show} handleClose={handleClose} players={players} />
      <SkinModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Modals;
