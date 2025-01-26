import { ISong } from './song.interface';

export interface IPlaylistRequest {
  name: string;
  userId: string;
}

export interface IPlaylist {
  id: string;
  name: string;
  userId: string;
}

export interface IPlaylistResponse {
  id: string;
  name: string;
  userId: string;
  songs: ISong[];
}

export interface IPlaylistDefaultPlaylistResponse {
  playlist: IPlaylistResponse;
  defaultPlaylist: IPlaylistResponse;
}
