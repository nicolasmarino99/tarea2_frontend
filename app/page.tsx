"use client";

import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "contexts/AuthContext";
import { withAuth } from "@/components/withAuth";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>MeruBook Products</h1>
        <p>Buy with friends and the world around you on products.</p>
      </div>
      <div className={styles.loginBox}>
        <Login />
        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={styles.createAccount}
        >
          Create new account
        </button>
        {open && (
          <div className={styles.signupBox}>
            <Signup closeSignUp={setOpen} />
          </div>
        )}
        <p className={styles.createPageText}>
          Create a Page for a celebrity, brand or business.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
