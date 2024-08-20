"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();
    const session = isAuthenticated;

    useEffect(() => {
      const { pathname } = window.location;
      if (!session && pathname !== "/") {
        redirect("/");
      } else {
      }
    }, [session, router]);

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
