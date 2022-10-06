import React, { useState, FC } from 'react';
import { login } from './logics';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../../slices/userSlice';

import './login.scss';

const Login: FC = () => {
   const [nickname, setNickname] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [error, setError] = useState<any>(null);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   function changeNicknameValue(e: React.ChangeEvent<HTMLInputElement>) {
      setNickname(e.target.value);
   }

   function changePasswordValue(e: React.ChangeEvent<HTMLInputElement>) {
      setPassword(e.target.value);
   }

   async function authUser() {
      const { status, data } = await login(nickname, password);

      if (status === 200) {
         dispatch(userLogin(data));
         navigate('/');
      } else {
         setError(data);
      }
   }

   return (
      <div className="login mx-auto max-w-xl my-20">
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
         {error}
         <br />
         <br />
         <button onClick={authUser}>Войти</button>
      </div>
   );
};

export default Login;
