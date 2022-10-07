import React, { useState, FC } from 'react';
import { login } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { userLogin } from '../../slices/userSlice';
import { toast } from 'react-toastify';

import './login.scss';

const Login: FC = () => {
   const [nickname, setNickname] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const fromPage: any = location.state?.from?.pathname || '/';

   function changeNicknameValue(e: React.ChangeEvent<HTMLInputElement>) {
      setNickname(e.target.value);
   }

   function changePasswordValue(e: React.ChangeEvent<HTMLInputElement>) {
      setPassword(e.target.value);
   }

   async function authUser() {
      if (nickname !== '' && password !== '') {
         setLoading(true);
         setNickname('');
         setPassword('');
         const { status, data } = await login(nickname, password);

         if (status === 200) {
            dispatch(userLogin(data));
            navigate(fromPage);
         } else {
            if (typeof data === 'string') {
               toast.error(data);
            }
         }

         setLoading(false);
      }
   }

   return (
      <div className="login fade-animation mx-auto max-w-xl my-20">
         <input
            type="text"
            placeholder="nickname..."
            value={nickname}
            onChange={changeNicknameValue}
         />
         <br />
         <br />
         <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={changePasswordValue}
         />
         <br />
         <br />
         <button onClick={authUser} disabled={loading}>
            Войти
         </button>
      </div>
   );
};

export default Login;
