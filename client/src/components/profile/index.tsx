import { EventHandler, FC, useState } from 'react';
import { useSelector } from 'react-redux';

import headDefault from '../../images/head-default.png';

const Profile: FC = () => {
   const { userData } = useSelector((state: any) => state.user);
   // const [textareaValue, setTextareaValue] = useState('');

   return (
      <div className="profile fade-animation container">
         <h2 className="mt-3">Profile {userData.NICKNAME}</h2>
         <img
            src={`https://mc-heads.net/head/${userData.NICKNAME}`}
            alt="head"
            onError={(e: any) => (e.target.src = headDefault)}
         />
      </div>
   );
};

export default Profile;

// {
/* <textarea
            style={{ color: '#000' }}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
         ></textarea>

         <div
            className="text"
            style={{
               background: '#fff',
               color: '#000',
               whiteSpace: 'pre-line',
            }}
         >
            {textareaValue}
         </div> */
// }
