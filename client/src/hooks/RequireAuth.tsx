import { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { pageRefresh } from '../utils/auth';
import Loading from '../components/loading/Loading';

interface Props {
   children: any;
}

const RequireAuth: FC<Props> = ({ children }) => {
   const { isLoading } = useSelector((state: any) => state.user);
   const location = useLocation();
   const dispatch = useDispatch();
   const token = localStorage.getItem('token');

   useEffect(() => {
      if (token) {
         pageRefresh(dispatch);
      }
   }, []);

   if (isLoading) {
      return <Loading />;
   }

   if (!token) {
      return <Navigate to="/login" state={{ from: location }} />;
   }

   return children;
};

export default RequireAuth;
