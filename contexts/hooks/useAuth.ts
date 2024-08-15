import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuthToken from './useAuthToken';
import useAuthUser from './useAuthUser';
import axiosInstance from '../../lib/axios';
import { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { User } from 'types';

const useAuth = () => {
  const router = useRouter();
  const { token, saveToken, removeToken } = useAuthToken();
  const { user, fetchUser } = useAuthUser();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, router]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post<{ token: string; user: User }>('/api/auth/login', { email, password });
      saveToken(data.token);
      fetchUser();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { data } = await axiosInstance.post<{ token: string; user: User }>('/api/auth/signup', { email, password, name });
      saveToken(data.token);
      fetchUser();
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = () => {
    axiosInstance.post('/api/auth/logout');
    removeToken();
    router.push('/login');
  };

  return { user, login, logout, signup };
};

export default useAuth;
