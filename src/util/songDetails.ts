// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import youtubesearchapi from 'youtube-search-api';
import { BadRequest } from './ApiResponse.util';
import { YT_REGEX } from './videoRegex.util';

export async function getSongDetails(url: string): Promise<{ title: string; thumbnail: string; description: string }> {
  const isMatch = url.match(YT_REGEX);
  if (!isMatch) throw new BadRequest('Invalid URL');
  const videoId = url.split('v=')[1];
  const videoDetails = await youtubesearchapi.GetVideoDetails(videoId);
  const title = videoDetails.title;
  const thumbnail = videoDetails.thumbnail.thumbnails[0].url;
  const description = videoDetails.description;
  return { title, thumbnail, description };
}
