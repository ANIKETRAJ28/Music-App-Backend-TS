import { Playlist } from '@prisma/client';

export interface IUserRequest {
  email: string;
  username?: string;
  password: string;
}

export interface IUserAuthRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  avatar: string;
  defaultPlaylist: Playlist | null;
}

export interface IUserRegister {
  id: string;
  name: string;
  username: string;
  password: string;
}
