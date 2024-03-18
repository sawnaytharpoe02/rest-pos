export interface BaseUser {
  name: string;
  email: string;
  password: string;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface UserSignUpParams extends BaseUser, BaseOptions {}

export interface UserSignInParams extends BaseOptions {
  email: string;
  password: string;
}

export interface User extends BaseUser {}

export interface UserSlice {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}
