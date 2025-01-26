export function getAvatar(username: string): string {
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;
}
