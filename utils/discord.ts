import type { APIUser } from "discord.js";

const DISCORD_OAUTH_CLIENT_ID = process.env.DISCORD_OAUTH_CLIENT_ID!;
const DISCORD_OAUTH_CLIENT_SECRET = process.env.DISCORD_OAUTH_CLIENT_SECRET!;
const DISCORD_OAUTH_REDIRECT_URL = process.env.DISCORD_OAUTH_REDIRECT_URL!;

async function normalize<T = unknown>(response: Response): Promise<T> {
  if (!response.ok) {
    try {
      const json = await response.json();
      throw new Error(json.error + ": " + json.error_description);
    } catch {
      throw new Error(
        response.statusText +
          ":" +
          (await response.text().catch(() => "no body"))
      );
    }
  }
  return await response.json();
}

export function getSignInUrl(state: string): string {
  return `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_OAUTH_CLIENT_ID}&scope=identify%20guilds&state=${state}&redirect_uri=${encodeURIComponent(
    DISCORD_OAUTH_REDIRECT_URL
  )}&prompt=consent`;
}

export async function authorizeCodeGrant(
  code: string
): Promise<{
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}> {
  const body = new URLSearchParams({
    client_id: DISCORD_OAUTH_CLIENT_ID,
    client_secret: DISCORD_OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: DISCORD_OAUTH_REDIRECT_URL,
  });

  const result = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  return await normalize(result);
}

export async function getMe(accessToken: string): Promise<APIUser> {
  const result = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });
  return normalize<APIUser>(result);
}

export function getAvatarUrl(userId: string, avatar: string) {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}`;
}
