import { prisma } from '@config/db.config';
import { IPlaylistRequest, IPlaylistResponse } from '@interface/playlist.interface';

export class PlaylistRepository {
  async createPlaylist(playlistPayload: IPlaylistRequest): Promise<IPlaylistResponse> {
    try {
      const createdPlaylist = await prisma.playlist.create({
        data: { ...playlistPayload },
        include: { songs: true },
      });
      return createdPlaylist;
    } catch (error) {
      console.log('error occured in createPlaylist in repository');
      throw error;
    }
  }

  async findPlaylistById(id: string): Promise<IPlaylistResponse> {
    try {
      const playlist = await prisma.playlist.findUnique({
        where: { id },
        include: {
          songs: true,
        },
      });
      if (!playlist) throw new Error('Playlist not found');
      return playlist;
    } catch (error) {
      console.log('error occured in findPlaylistById in repository');
      throw error;
    }
  }

  async findPlaylistByUserId(id: string): Promise<IPlaylistResponse[]> {
    try {
      const playlists = await prisma.playlist.findMany({
        where: { userId: id },
        include: { songs: true },
      });
      return playlists;
    } catch (error) {
      console.log('error occured in findPlaylistByUserId in repository');
      throw error;
    }
  }

  async addSongToPlaylist(id: string, songId: string): Promise<IPlaylistResponse> {
    try {
      const updatedPlaylist = await prisma.playlist.update({
        where: { id },
        data: {
          songs: { connect: { id: songId } },
        },
        include: { songs: true },
      });
      return updatedPlaylist;
    } catch (error) {
      console.log('error occured in addSongToPlaylist in repository');
      throw error;
    }
  }

  async removeSongFromPlaylist(id: string, songId: string): Promise<IPlaylistResponse> {
    try {
      const updatedPlaylist = await prisma.playlist.update({
        where: { id },
        data: {
          songs: {
            disconnect: { id: songId },
          },
        },
        include: { songs: true },
      });
      return updatedPlaylist;
    } catch (error) {
      console.log('error occured in removeSongFromPlaylist in repository');
      throw error;
    }
  }

  async deletePlaylist(id: string): Promise<IPlaylistResponse> {
    try {
      const deletedPlaylist = await prisma.playlist.delete({
        where: { id },
        include: { songs: true },
      });
      return deletedPlaylist;
    } catch (error) {
      console.log('error occured in deletePlaylist in repository');
      throw error;
    }
  }
}
