import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { login } from './slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      dispatch(login());
      setIsReady(true);
    } else {
      router.push('/login');
    }
  }, [dispatch, router]);

  if (!isReady) {
    return (<h1>Loading...</h1>);
  }

  return children;
};

export default ProtectedRoute;
