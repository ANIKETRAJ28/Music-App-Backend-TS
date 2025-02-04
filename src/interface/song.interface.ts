export interface ISong {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  description: string;
}

export interface IJamSong extends ISong {
  upvotes: number;
}
