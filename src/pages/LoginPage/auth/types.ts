import { User } from '../types';

export type AuthState = {
  user: undefined | User;
  isLoading: boolean;
  error: any;
};

export type Credentials = {
  email: string;
  password: string;
};

export type LoginType = {
  error: boolean;
  token: string;
};
