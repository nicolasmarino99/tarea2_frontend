"use client";

import Logout from "@/components/Logout";
import { useAuthContext } from "contexts/AuthContext";
import React from "react";

export default function Dashboard() {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Dashboard {user?.id}</h1>
      {user?.id}
      <Logout />
    </div>
  );
}
