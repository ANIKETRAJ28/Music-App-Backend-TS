import { redisClient } from '../config/db.config';
import { IJamSong } from '../interface/song.interface';
import { BadRequest } from '../util/ApiResponse.util';
import { getSongDetails } from '../util/songDetails';

export class JamRepository {
  async addSongToQueue(id: string, url: string): Promise<IJamSong> {
    const { title, description, thumbnail } = await getSongDetails(url);
    const len = await redisClient.lLen(id.toString());
    const song: IJamSong = {
      id: len.toString(),
      url,
      title,
      description,
      thumbnail,
      upvotes: 0,
    };
    await redisClient.rPush(id, JSON.stringify(song));
    return song;
  }

  async deleteSongFromQueue(id: string): Promise<IJamSong> {
    const song: string | null = await redisClient.lPop(id);
    if (!song) throw new BadRequest('Queue is empty');
    return JSON.parse(song);
  }

  async upvoteSong(id: string, songId: string): Promise<IJamSong> {
    const song: string | null = await redisClient.lIndex(id, parseInt(songId));
    if (!song) throw new BadRequest('Song not found');
    const parsedSong: IJamSong = JSON.parse(song);
    parsedSong.upvotes++;
    await redisClient.lSet(id, parseInt(songId), JSON.stringify(parsedSong));
    return parsedSong;
  }

  async downvoteSong(id: string, songId: string): Promise<IJamSong> {
    const song: string | null = await redisClient.lIndex(id, parseInt(songId));
    if (!song) throw new BadRequest('Song not found');
    const parsedSong: IJamSong = JSON.parse(song);
    parsedSong.upvotes--;
    await redisClient.lSet(id, parseInt(songId), JSON.stringify(parsedSong));
    return parsedSong;
  }

  async getQueue(id: string): Promise<IJamSong[]> {
    const len = await redisClient.lLen(id);
    const songs = await redisClient.lRange(id, 0, len);
    const parsedSongs: IJamSong[] = songs.map((song) => JSON.parse(song));
    return parsedSongs;
  }

  async clearQueue(id: string): Promise<void> {
    await redisClient.del(id);
  }
}
