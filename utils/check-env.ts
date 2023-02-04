import { strict } from "assert";

export function checkAllEnvs() {
  strict.ok(process.env.DISCORD_OAUTH_CLIENT_ID);
  strict.ok(process.env.DISCORD_OAUTH_REDIRECT_URL);
  strict.ok(process.env.DISCORD_OAUTH_CLIENT_SECRET);
  strict.ok(process.env.PNGIN_AWS_ACCESS_KEY_ID);
  strict.ok(process.env.PNGIN_AWS_SECRET_ACCESS_KEY);
  strict.ok(process.env.PNGIN_AWS_REGION);
  strict.ok(process.env.PNGIN_SESSION_TABLE_NAME);
  strict.ok(process.env.PNGIN_JWT_PRIVATE_KEY);
  strict.ok(process.env.PNGIN_JWT_PUBLIC_KEY);
}
