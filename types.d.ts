declare module "*module.css" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

export interface User {
  id: string;
  username: string;
  email: string
}

export interface SignupParams {
  email: string;
  emailConfirmation: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}
