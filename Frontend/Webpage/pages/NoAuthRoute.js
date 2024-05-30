import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NoAuthRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    if (token) {
      router.push('/'); // 로그인된 상태에서 접근하면 메인 페이지로 리디렉션
    }
  }, [router]);

  if (isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
};

export default NoAuthRoute;
