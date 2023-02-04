import { ok } from "assert/strict";

export function checkAllEnvs() {
  ok(process.env.DISCORD_OAUTH_CLIENT_ID);
  ok(process.env.DISCORD_OAUTH_REDIRECT_URL);
  ok(process.env.DISCORD_OAUTH_CLIENT_SECRET);
  ok(process.env.PNGIN_AWS_ACCESS_KEY_ID);
  ok(process.env.PNGIN_AWS_SECRET_ACCESS_KEY);
  ok(process.env.PNGIN_AWS_REGION);
  ok(process.env.PNGIN_SESSION_TABLE_NAME);
  ok(process.env.PNGIN_JWT_PRIVATE_KEY);
  ok(process.env.PNGIN_JWT_PUBLIC_KEY);
}
