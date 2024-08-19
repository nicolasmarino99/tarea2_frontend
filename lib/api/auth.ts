import axiosInstance from "../axios";
import { SignupParams, User } from "types";

interface dataContent {
  code: number
  message: string
  data: {user: User}
}
interface loginResponse {
  status: dataContent
}

export const loginApi = async (email: string, password: string) => {
  const params = {
    user: {
      email,
      password,
    },
  };
  return axiosInstance.post<loginResponse>("/login", params);
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
  return axiosInstance.post<loginResponse>("/signup", params);
};

export const logoutApi = async (token: string) => {
  return axiosInstance.delete("/logout", {
    headers: {
      Authorization: token
    }
  });
};
