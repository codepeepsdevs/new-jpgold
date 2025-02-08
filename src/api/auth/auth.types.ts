// Login

export interface ILogin {
  email: string;
  password: string;
}

export interface RLogin {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Register

export interface IRegister {
  email: string;
  password: string;
  fullname: string;
}

export interface RRegister {
  message: string;
}
