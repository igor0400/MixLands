import { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { pageRefresh } from '../utils/auth';
import Loading from '../components/loading/Loading';
import { setLoading, userLogout } from '../slices/userSlice';

interface Props {
   children: any;
}

const RequireAuth: FC<Props> = ({ children }) => {
   const { isLoading, isError } = useSelector((state: any) => state.user);
   const location = useLocation();
   const dispatch = useDispatch();
   const token = localStorage.getItem('token');

   useEffect(() => {
      dispatch(setLoading(true));
      if (token) {
         pageRefresh(dispatch);
      } else {
         dispatch(userLogout());
      }
   }, [token]);

   if (isLoading) {
      return <Loading />;
   }

   if (!token) {
      return <Navigate to="/login" state={{ from: location }} />;
   }

   if (isError) {
      return <h2>Error</h2>;
   }

   return children;
};

export default RequireAuth;
