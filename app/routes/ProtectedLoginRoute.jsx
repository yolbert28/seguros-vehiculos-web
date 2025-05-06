import { useEffect } from 'react';
import { useInfoStore } from '../store';
import { useLocation, useNavigate } from 'react-router';

const ProtectedLoginRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useInfoStore();

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return !token ? children : null;
};

export default ProtectedLoginRoute;