import { useEffect } from 'react';
import { useInfoStore } from '../store';
import { useLocation, useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useInfoStore();
  const initializeTimer = useInfoStore((state) => state.initializeTimer)

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    initializeTimer();
  },[initializeTimer]);

  return token ? children : null;
};

export default ProtectedRoute;