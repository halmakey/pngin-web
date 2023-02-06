function check(value: string | undefined) {
  if (!value) {
    throw new Error("value is empty");
  }
}

export function checkAllEnvs() {
  check(process.env.DISCORD_OAUTH_CLIENT_ID);
  check(process.env.DISCORD_OAUTH_CLIENT_SECRET);
  check(process.env.PNGIN_AWS_ACCESS_KEY_ID);
  check(process.env.PNGIN_AWS_SECRET_ACCESS_KEY);
  check(process.env.PNGIN_AWS_REGION);
  check(process.env.PNGIN_SESSION_TABLE_NAME);
  check(process.env.PNGIN_JWT_PRIVATE_KEY);
  check(process.env.PNGIN_JWT_PUBLIC_KEY);
}
