import useCookie from './useCookie';

const useUserCookie = () => {
  const {value, save, remove} = useCookie('user');

  return {
    user: value,
    save,
    remove,
  };
};

export default useUserCookie;
