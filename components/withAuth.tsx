"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();
    const session = isAuthenticated;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const { pathname } = window.location;
      console.log(pathname, session, session && pathname === "/");
      if (session && pathname === "/") {
        // redirect("/shop");
      } else if (!session && pathname !== "/") {
        redirect("/");
      } else {
        setLoading(false);
      }
    }, [session, router]);

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
