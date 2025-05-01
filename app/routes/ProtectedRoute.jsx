import { useEffect } from 'react';
import { useInfoStore } from '../store';
import { useLocation, useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useInfoStore();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      navigate(location.pathname);
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;