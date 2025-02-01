import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { JamRepository } from './repository/jam.repository';

let io: Server | null = null;

export const initSocket = (server: HttpServer): Server | null => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('start jam', async (id: string) => {
      socket.join(id);
      console.log('joined room', id);
      const jamReposiotry = new JamRepository();
      const jam = await jamReposiotry.getQueue(id);
      socket.emit('get jam', { id: id, jam: jam });
    });

    socket.on('add song', async (id: string, url: string) => {
      const jamReposiotry = new JamRepository();
      const song = await jamReposiotry.addSongToQueue(id, url);
      console.log('song...');
      socket.to(id).emit('song added', song);
    });

    socket.on('upvote song', async (id: string, songId: string) => {
      try {
        const jamReposiotry = new JamRepository();
        const song = await jamReposiotry.upvoteSong(id, songId);
        socket.broadcast.to(id).emit('song upvoted', song);
      } catch (error) {
        console.log('error occured in add song event', error);
      }
    });

    socket.on('downvote song', async (id: string, songId: string) => {
      try {
        const jamReposiotry = new JamRepository();
        const song = await jamReposiotry.downvoteSong(id, songId);
        socket.broadcast.to(id).emit('song downvoted', song);
      } catch (error) {
        console.log('error occured in add song event', error);
      }
    });

    socket.on('delete song', async (id: string) => {
      try {
        const jamReposiotry = new JamRepository();
        const song = await jamReposiotry.deleteSongFromQueue(id);
        socket.broadcast.to(id).emit('song deleted', song);
      } catch (error) {
        console.log('error occured in next song event', error);
      }
    });

    socket.on('leave jam', (id: string) => {
      socket.leave(id);
      console.log('left room', id);
    });
  });

  return io;
};

export const getIO = (): Server | null => {
  return io;
};
