"use client";

import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
// import { SomeOtherProvider } from "../contexts/SomeOtherContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {/* <SomeOtherProvider> */}
      {children}
      {/* </SomeOtherProvider> */}
    </AuthProvider>
  );
};

export default Providers;
