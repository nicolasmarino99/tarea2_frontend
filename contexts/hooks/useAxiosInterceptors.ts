import { useEffect, useCallback } from "react";
import axiosInstance from "lib/axios";
import useAuthCookie from "./useAuthCookie";

const useAxiosInterceptors = (setIsAuthenticated: (isAuthenticated: boolean) => void) => {
  const authCookie = useAuthCookie();

  const requestInterceptor = useCallback((config: any) => {
    if (authCookie.token) {
      config.headers["authorization"] = `Bearer ${authCookie.token}`;
    }
    return config;
  }, [authCookie.token]);

  const errorInterceptor = useCallback((error: any) => {
    if (error.response?.status === 401) {
      setIsAuthenticated(false);
      authCookie.remove();
    }
    return Promise.reject(error);
  }, [authCookie, setIsAuthenticated]);

  useEffect(() => {
    const requestInterceptorId = axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);
    const responseInterceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      errorInterceptor
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptorId);
      axiosInstance.interceptors.response.eject(responseInterceptorId);
    };
  }, [requestInterceptor, errorInterceptor]);
};

export default useAxiosInterceptors;
