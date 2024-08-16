"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "./Login.module.css"; // Import CSS module for styling
import { useAuthContext } from "contexts/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </label>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p className={styles.link}>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p className={styles.link}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
