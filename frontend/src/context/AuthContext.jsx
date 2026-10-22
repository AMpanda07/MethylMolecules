import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/api';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => storage.get(STORAGE_KEYS.TOKEN, null));
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on initial load
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const storedToken = storage.get(STORAGE_KEYS.TOKEN, null);
      if (storedToken) {
        try {
          const data = await authService.getMe();
          if (isMounted && data?.user) {
            setUser(data.user);
            setToken(storedToken);
          }
        } catch (error) {
          console.warn('Session expired or invalid:', error.message);
          if (isMounted) {
            authService.logout();
            setUser(null);
            setToken(null);
          }
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setToken(response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

