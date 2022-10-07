import { FC } from 'react';
import { useSelector } from 'react-redux';

const Profile: FC = () => {
   const { user } = useSelector((state: any) => state.user);

   return (
      <div className="profile fade-animation container">
         <h2 className='mt-3'>Profile {user.NICKNAME}</h2>
      </div>
   );
};

export default Profile;
