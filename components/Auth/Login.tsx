"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useAuthContext } from "contexts/AuthContext";
import useRedirectOnAuth from "./hooks/useRedirectOnAuth";
import styles from "./Login.module.css";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  useRedirectOnAuth("/shop");

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
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="email"
          placeholder="Email or phone number"
          {...register("email", { required: "Email is required" })}
          className={styles.inputField}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={styles.inputField}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
