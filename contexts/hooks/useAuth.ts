import { useEffect, useState } from 'react';
import useAuthToken from './useAuthToken';
import useAuthUser from './useAuthUser';
import { loginApi, signupApi, logoutApi } from '../../lib/auth'; 
import { AxiosError } from 'axios';
import axiosInstance from 'lib/axios';

const useAuth = () => {
  const { token, saveToken, removeToken } = useAuthToken();
  const { user, fetchUser } = useAuthUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const requestInterceptor = (config: any) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    };

    const responseInterceptor = (response: any) => response;

    const errorInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        removeToken();
      }
      return Promise.reject(error);
    };

    const requestInterceptorId = axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);
    const responseInterceptorId = axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

    const checkAuth = async () => {
      if (token) {
        try {
          await fetchUser();
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          removeToken();
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptorId);
      axiosInstance.interceptors.response.eject(responseInterceptorId);
    };
  }, [token, removeToken, fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginApi(email, password);
      saveToken(data.token);
      fetchUser();
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, passwordConfirmation: string) => {
    try {
      const { data } = await signupApi(email, password, name, passwordConfirmation); 
      saveToken(data.token);
      fetchUser();
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Signup failed', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutApi(); 
      removeToken();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return { user, login, signup, logout, isAuthenticated };
};

export default useAuth;
