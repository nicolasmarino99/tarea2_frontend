import axiosInstance from "./axios";
import { SignupParams, User } from "types";

export const loginApi = async (email: string, password: string) => {
  return axiosInstance.post<{ token: string; user: User }>("/login", {
    email,
    password,
  });
};

export const signupApi = async ({
  email,
  password,
  name,
  passwordConfirmation,
  emailConfirmation,
}: SignupParams) => {
  const params = {
    user: {
      email,
      password,
      username: name,
      password_confirmation: passwordConfirmation,
      email_confirmation: emailConfirmation,
    },
  };
  return axiosInstance.post<{ token: string; user: User }>("/signup", params);
};

export const logoutApi = async () => {
  return axiosInstance.post("/logout");
};
