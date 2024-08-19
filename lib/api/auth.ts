import axiosInstance from "../axios";
import { SignupParams, User } from "types";

export const loginApi = async (email: string, password: string) => {
  const params = {
    user: {
      email,
      password,
    },
  };
  return axiosInstance.post<{ token: string; user: User }>("/login", params);
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
      // email_confirmation: emailConfirmation,
    },
  };
  return axiosInstance.post<{ token: string; user: User }>("/signup", params);
};

export const logoutApi = async () => {
  return axiosInstance.post("/logout");
};
