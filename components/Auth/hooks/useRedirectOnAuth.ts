import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "contexts/AuthContext";

const useRedirectOnAuth = (redirectTo: string) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);
};

export default useRedirectOnAuth;
