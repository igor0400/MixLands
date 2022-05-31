import BuyModal from './BuyModal';
import LoginModal from './LoginModal';

const Modals = ({ show, handleClose, players }) => {
  return (
    <>
      <BuyModal show={show} handleClose={handleClose} />
      <LoginModal show={show} handleClose={handleClose} players={players} />
    </>
  );
};

export default Modals;
