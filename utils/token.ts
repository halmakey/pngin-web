import { SignJWT, importJWK, jwtVerify, base64url } from "jose";

const JWT_PRIVATE_KEY = new TextDecoder().decode(
  base64url.decode(process.env.PNGIN_JWT_PRIVATE_KEY!)
);
const JWT_PUBLIC_KEY = new TextDecoder().decode(
  base64url.decode(process.env.PNGIN_JWT_PUBLIC_KEY!)
);

const ES512 = "ES512";

const preparePrivateKey = importJWK(JSON.parse(JWT_PRIVATE_KEY), ES512);
const preparePublicKey = importJWK(JSON.parse(JWT_PUBLIC_KEY), ES512);

export interface SessionPayload {
  id: `session-${string}`;
  nonce: string;
}

export async function createSessionToken(
  session: SessionPayload,
  expiresIn: number,
  callback?: string
): Promise<string> {
  const key = await preparePrivateKey;
  const jwt = await new SignJWT({
    session: {
      id: session.id,
      nonce: session.nonce,
    },
    callback,
  })
    .setProtectedHeader({ alg: ES512, typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(key);

  return jwt;
}

function isSessionPayload(payload: unknown): payload is SessionPayload {
  return (
    !!payload &&
    typeof payload === "object" &&
    "id" in payload &&
    typeof payload.id === "string" &&
    payload.id.startsWith("session-") &&
    "nonce" in payload &&
    typeof payload.nonce === "string"
  );
}

export async function verifySessionToken(token: string) {
  const key = await preparePublicKey;
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ES512],
  });
  if (isSessionPayload(payload.session)) {
    return payload as { session: SessionPayload; callback?: string };
  }
}

export interface UserPayload {
  id: `user-${string}`;
  name: string;
  avatarUrl: string;
}

export async function createUserSessionToken(
  session: SessionPayload,
  user: UserPayload,
  expiresIn: number
): Promise<string> {
  const key = await preparePrivateKey;
  const jwt = await new SignJWT({
    session: {
      id: session.id,
      nonce: session.nonce,
    },
    user: {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
  })
    .setProtectedHeader({ alg: ES512, typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(key);

  return jwt;
}

function isUserPayload(payload: unknown): payload is UserPayload {
  return (
    !!payload &&
    typeof payload === "object" &&
    "id" in payload &&
    typeof payload.id === "string" &&
    payload.id.startsWith("user-") &&
    "name" in payload &&
    typeof payload.name === "string" &&
    "avatarUrl" in payload &&
    typeof payload.avatarUrl === "string"
  );
}

export async function verifyUserToken(token: string) {
  const key = await preparePublicKey;
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ES512],
  });
  if (isSessionPayload(payload.session) && isUserPayload(payload.user)) {
    return payload as { session: SessionPayload; user: UserPayload };
  }
}
