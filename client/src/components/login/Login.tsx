import React, { useState, FC } from 'react';
import { login } from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { userLogin } from '../../slices/userSlice';
import { addError } from '../../slices/userSlice';

import './login.scss';

const Login: FC = () => {
   const [nickname, setNickname] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const { errors } = useSelector((state: any) => state.user);

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
      const { status, data } = await login(nickname, password);

      if (status === 200) {
         dispatch(userLogin(data));
         navigate(fromPage);
      } else {
         dispatch(addError(data));
      }
   }

   if (errors.length) console.log(errors);

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
         <button onClick={authUser}>Войти</button>
      </div>
   );
};

export default Login;
