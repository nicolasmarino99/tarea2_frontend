import useCookie from './useCookie';

const useAuthCookie = () => {
  const {value, save, remove} = useCookie('token');
  return {
    token: value,
    save,
    remove,
  };
};

export default useAuthCookie;
