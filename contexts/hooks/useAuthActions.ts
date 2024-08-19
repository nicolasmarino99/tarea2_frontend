import useAuthCookie from "./useAuthCookie";
import useUserCookie from "./useUserCookie";
import { loginApi, signupApi, logoutApi } from "../../lib/api/auth";
import { SignupParams } from "types";

const useAuthActions = (setIsAuthenticated: (isAuthenticated: boolean) => void) => {
  const authCookie = useAuthCookie();
  const userCookie = useUserCookie();

  const handleAuthSuccess = (data: any, headers: any) => {
    const token = headers["authorization"].split(" ")[1];
    authCookie.save(token);
    userCookie.save(data.status.data.user.username);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, headers } = await loginApi(email, password);
      handleAuthSuccess(data, headers);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const signup = async (signupParams: SignupParams) => {
    try {
      const { data, headers } = await signupApi(signupParams);
      handleAuthSuccess(data, headers);
      return true;
    } catch (error) {
      console.error("Signup failed", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutApi(authCookie.token);
      authCookie.remove();
      userCookie.remove();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { login, signup, logout };
};

export default useAuthActions;
