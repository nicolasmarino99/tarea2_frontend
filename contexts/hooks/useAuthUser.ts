import { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';
import useAuthToken from './useAuthToken';
import { User } from 'types';

const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { token } = useAuthToken();

  useEffect(() => {
    if (token || token !== "undefined") {
      axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
      console.log(axiosInstance.defaults, 'axiosInstance')
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      // setUser(data.user);
    } catch (error) {
      setUser(null);
    }
  };

  return { user, fetchUser };
};

export default useAuthUser;
