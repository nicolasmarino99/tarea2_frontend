import { useCookies } from 'react-cookie';

const useCookie = (cookieName: string) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

  const save = (value: string) => {
    const week = 604800; // 1 week in seconds
    setCookie(cookieName, value, { path: '/', maxAge: week });
  };

  const remove = () => {
    removeCookie(cookieName);
  };

  return {
    value: cookies[cookieName],
    save,
    remove,
  };
};

export default useCookie;
