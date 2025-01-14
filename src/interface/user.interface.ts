export interface IUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}
