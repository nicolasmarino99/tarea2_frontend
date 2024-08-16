"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";
import styles from "./Logout.module.css"; // Import CSS module for styling

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div className={styles.logoutContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Logout;
