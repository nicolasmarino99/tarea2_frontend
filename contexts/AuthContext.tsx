"use client";

import { createContext, useContext, ReactNode } from "react";
import useAuth from "./hooks/useAuth";
import { User } from "types";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    name: string,
    passwordConfirmation: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, login, logout, signup, isAuthenticated } = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
