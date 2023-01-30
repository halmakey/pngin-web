export interface ApiUser {
  id: string;
  username: string;
  displayName?: string;
  discriminator: string;
  avatarUrl: string;
}
