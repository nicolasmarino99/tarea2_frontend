import { useCookies } from 'react-cookie';

const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const saveToken = (token: string) => {
    const week = 604800
    setCookie('token', token, { path: '/', maxAge: week });
  };

  const removeToken = () => {
    removeCookie('token');
  };

  return {
    token: cookies.token,
    saveToken,
    removeToken,
  };
};

export default useAuthToken;
