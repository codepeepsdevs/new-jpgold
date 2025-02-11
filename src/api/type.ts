interface IUserRole {
  USER: "USER";
  ADMIN: "ADMIN";
}

interface IUser {
  id: string;
  fullname: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  otpToken: string | null;
  role: IUserRole;
  tokenVersion: number;
  isGoogleRegister: boolean;
  isFacebookRegister: boolean;
  createdAt: string;
  updatedAt: string;
}
