import { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';
import useAuthToken from './useAuthToken';
import { User } from 'types';

const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { token } = useAuthToken();

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get<{ user: User }>('/api/auth/me');
      setUser(data.user);
    } catch (error) {
      setUser(null);
    }
  };

  return { user, fetchUser };
};

export default useAuthUser;
