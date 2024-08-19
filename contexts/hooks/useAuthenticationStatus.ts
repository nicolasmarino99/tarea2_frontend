import { useState, useEffect, useCallback } from "react";
import useAuthCookie from "./useAuthCookie";

const useAuthenticationStatus = () => {
  const authCookie = useAuthCookie();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!authCookie.token);

  const checkAuth = useCallback(() => {
    if (authCookie.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authCookie.token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuthenticationStatus;
