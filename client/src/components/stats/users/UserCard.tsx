import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSlicedNickname } from '../../../utils/supportFunctions';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { OnlineUserType } from '../../../utils/types';

import faceDefault from '../../../images/face-default.png';

interface Props {
   user: any;
   onlineUsers: any[];
}

const UserCard: FC<Props> = ({ user, onlineUsers }) => {
   const [isImgLoad, setIsImgLoad] = useState<boolean>(false);

   return (
      <div className="user p-4 flex">
         <Link to={user.NICKNAME}>
            <div className="relative">
               <img
                  src={faceDefault}
                  alt="avatar"
                  style={{ display: isImgLoad ? 'none' : 'block' }}
                  className="w-16 h-16 rounded"
               />
               <img
                  src={`https://mc-heads.net/avatar/${
                     user.NICKNAME || 'что-то'
                  }`}
                  alt="avatar"
                  style={{ display: isImgLoad ? 'block' : 'none' }}
                  className="w-16 h-16 rounded"
                  onLoad={() => setIsImgLoad(true)}
               />
               {onlineUsers
                  ? onlineUsers.map((player: OnlineUserType, i: number) =>
                       user.NICKNAME === player.nickname ? (
                          <OverlayTrigger
                             placement={'top'}
                             overlay={
                                <Tooltip id="tooltip-top">
                                   <b>На сервере {player.server}</b>
                                </Tooltip>
                             }
                             key={i}
                          >
                             <div className="user__active__circle"></div>
                          </OverlayTrigger>
                       ) : null
                    )
                  : null}
            </div>
         </Link>

         <div className="pl-4">
            <h4 className="text-lg">
               {getSlicedNickname(user.NICKNAME, 16, 13)}
            </h4>
            <p>
               <span className="text-gray-400">Наиграно:</span> {user.HOURS} ч.
            </p>
         </div>
      </div>
   );
};

export default UserCard;
