import { useRouter } from "next/router";
import React, { useEffect, ReactNode, useState } from "react";
import useAuth from "../contexts/hooks/useAuth";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  console.log(isAuthenticated, "isAuthenticated");
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false); // Set loading to false if authenticated
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <Spinner />; // Show spinner while checking authentication
  }

  return <>{children}</>;
};

export default ProtectedRoute;
