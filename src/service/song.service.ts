import { IPlaylistResponse } from '../interface/playlist.interface';
import { ISong } from '../interface/song.interface';
import { PlaylistRepository } from '../repository/playlist.repository';
import { SongRepository } from '../repository/song.repository';
import { BadRequest } from '../util/ApiResponse.util';
import { YT_REGEX } from '../util/videoRegex.util';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import youtubesearchapi from 'youtube-search-api';

export class SongService {
  private songRepository: SongRepository;
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.songRepository = new SongRepository();
    this.playlistRepository = new PlaylistRepository();
  }

  async createSong(url: string): Promise<ISong> {
    const isMatch = url.match(YT_REGEX);
    if (!isMatch) throw new BadRequest('Invalid URL');
    const videoId = url.split('v=')[1];
    const videoDetails = await youtubesearchapi.GetVideoDetails(videoId);
    const title = videoDetails.title;
    const thumbnail = videoDetails.thumbnail.thumbnails[0].url;
    const description = videoDetails.description;
    const createdSong = await this.songRepository.createSong(url, title, thumbnail, description);
    return createdSong;
  }

  async createSongForDefaultPlaylist(url: string, defaultPlaylistId: string): Promise<IPlaylistResponse> {
    const createdSong = await this.createSong(url);
    const updatedDefaultPlaylist = await this.playlistRepository.updateDefaultPlaylist(
      defaultPlaylistId,
      createdSong.id,
    );
    return updatedDefaultPlaylist;
  }

  async findSongById(id: string): Promise<ISong> {
    const song = await this.songRepository.findSongById(id);
    return song;
  }
}
