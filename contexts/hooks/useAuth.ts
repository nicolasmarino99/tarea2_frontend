import useAuthenticationStatus from "./useAuthenticationStatus";
import useAxiosInterceptors from "./useAxiosInterceptors";
import useAuthActions from "./useAuthActions";
import useUserCookie from "./useUserCookie";

const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthenticationStatus();
  const { login, signup, logout } = useAuthActions(setIsAuthenticated);
  const userCookie = useUserCookie();
  
  useAxiosInterceptors(setIsAuthenticated);

  return { user: userCookie.user, login, signup, logout, isAuthenticated };
};

export default useAuth;
