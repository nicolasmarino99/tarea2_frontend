"use client";

import { AuthProvider } from "contexts/AuthContext";
import { ProductsProvider } from "contexts/ProductContext";
import React from "react";
// import { SomeOtherProvider } from "../contexts/SomeOtherContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {/* <SomeOtherProvider> */}
        {children}
        {/* </SomeOtherProvider> */}
      </ProductsProvider>
    </AuthProvider>
  );
};

export default Providers;
