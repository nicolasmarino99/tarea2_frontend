"use client";

import Login from "@/components/Login";
import Signup from "@/components/Signup";
import styles from "./page.module.css"; // Import CSS module for styling
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
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
}
