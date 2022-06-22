import BuyModal from './BuyModal';
import LoginModal from './LoginModal';
import ChangePassword from './ChangePassword';

const Modals = ({ show, handleClose, players, getData }) => {
   return (
      <>
         <BuyModal show={show} handleClose={handleClose} />
         <LoginModal show={show} handleClose={handleClose} players={players} />
         <ChangePassword
            show={show}
            handleClose={handleClose}
            getData={getData}
         />
      </>
   );
};

export default Modals;
