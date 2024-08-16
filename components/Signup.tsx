// components/Signup.tsx
"use client";

import useAuth from "contexts/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./Signup.module.css"; // Import CSS module for styling

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signup(data.email, data.password, data.name, data.confirmPassword);
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Sign Up</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={styles.input}
          />
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
        </label>
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
        <label className={styles.label}>
          Confirm Password:
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </label>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <p className={styles.link}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
