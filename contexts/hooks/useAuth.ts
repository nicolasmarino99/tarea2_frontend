import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginApi, signupApi, logoutApi } from "../../lib/api/auth";
import { AxiosError } from "axios";
import axiosInstance from "lib/axios";
import { SignupParams, User } from "types";
import useAuthCookie from "./useAuthCookie";
import useUserCookie from "./useUserCookie";

const useAuth = () => {
  const authCookie = useAuthCookie();
  const userCookie = useUserCookie();
  const [user, setUser] = useState<User | null>(userCookie.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const requestInterceptor = (config: any) => {
      if (authCookie.token) {
        config.headers["authorization"] = `Bearer ${authCookie.token}`;
      }
      return config;
    };

    const responseInterceptor = (response: any) => response;

    const errorInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        authCookie.remove();
      }
      return Promise.reject(error);
    };

    const requestInterceptorId = axiosInstance.interceptors.request.use(
      requestInterceptor,
      errorInterceptor
    );
    const responseInterceptorId = axiosInstance.interceptors.response.use(
      responseInterceptor,
      errorInterceptor
    );

    const checkAuth = async () => {
      if (authCookie.token) {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          authCookie.remove();
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptorId);
      axiosInstance.interceptors.response.eject(responseInterceptorId);
    };
  }, [authCookie.remove, authCookie.token]);

  const login = async (email: string, password: string) => {
    try {
      const { data, headers } = await loginApi(email, password);
      userCookie.save(data.status.data.user.username);
      authCookie.save(headers["authorization"].split(" ")[1]);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const signup = async ({
    email,
    emailConfirmation,
    password,
    name,
    passwordConfirmation,
  }: SignupParams) => {
    try {
      const { data, headers } = await signupApi({
        email,
        password,
        name,
        passwordConfirmation,
        emailConfirmation,
      });
      authCookie.save(headers["authorization"].split(" ")[1]);
      userCookie.save(data.status.data.user.username);
      setIsAuthenticated(true);
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
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { user, login, signup, logout, isAuthenticated };
};

export default useAuth;
