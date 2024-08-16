import axiosInstance from './axios';
import { User } from 'types';

export const loginApi = async (email: string, password: string) => {
  return axiosInstance.post<{ token: string; user: User }>('/login', { email, password });
};

export const signupApi = async (email: string, password: string, name: string) => {
  return axiosInstance.post<{ token: string; user: User }>('/signup', { email, password, name });
};

export const logoutApi = async () => {
  return axiosInstance.post('/logout');
};
