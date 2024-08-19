"use client";

import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Signup.module.css"; // Import CSS module for styling
import { useRouter } from "next/navigation";
import { useAuthContext } from "contexts/AuthContext";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  emailConfirmation: string;
  passwordConfirmation: string;
};

interface Signup {
  closeSignUp: Dispatch<SetStateAction<boolean>>;
}
const Signup = ({ closeSignUp }: Signup) => {
  const router = useRouter();
  const { signup, isAuthenticated } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const { password, emailConfirmation, passwordConfirmation, email, name } =
      data;

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }
    if (email !== emailConfirmation) {
      setError("Emails do not match.");
      return;
    }

    try {
      await signup({
        email,
        password,
        name,
        passwordConfirmation,
        emailConfirmation,
      });
      if (isAuthenticated) router.push("/shop");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.subtit}>It's quick and easy.</p>
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
          Confirm email:
          <input
            type="email"
            {...register("emailConfirmation", {
              required: "Please confirm your email",
            })}
            className={styles.input}
          />
          {errors.emailConfirmation && (
            <p className={styles.errorMessage}>
              {errors.emailConfirmation.message}
            </p>
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
            {...register("passwordConfirmation", {
              required: "Please confirm your password",
            })}
            className={styles.input}
          />
          {errors.passwordConfirmation && (
            <p className={styles.errorMessage}>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </label>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <p className={styles.link}>
        Already have an account?{" "}
        <a onClick={() => closeSignUp((prev) => !prev)}>Login</a>
      </p>
    </div>
  );
};

export default Signup;
