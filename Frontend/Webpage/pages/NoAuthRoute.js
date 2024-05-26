import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NoAuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chatbot'); // Redirect to a protected route
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
};

export default NoAuthRoute;
