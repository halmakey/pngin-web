import { SignJWT, importJWK, jwtVerify } from "jose";

const JWT_PRIVATE_KEY = Buffer.from(
  process.env.PNGIN_JWT_PRIVATE_KEY!,
  "base64url"
).toString("utf-8");
const JWT_PUBLIC_KEY = Buffer.from(
  process.env.PNGIN_JWT_PUBLIC_KEY!,
  "base64url"
).toString("utf-8");

console.log({
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
});

const ES512 = "ES512";

const preparePrivateKey = importJWK(JSON.parse(JWT_PRIVATE_KEY), ES512);
const preparePublicKey = importJWK(JSON.parse(JWT_PUBLIC_KEY), ES512);

export async function createToken(
  session: string,
  user: string,
  expiresIn: number
): Promise<string> {
  const key = await preparePrivateKey;
  const jwt = await new SignJWT({
    session,
    user
  })
    .setProtectedHeader({ alg: ES512, typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(key);

  return jwt;
}

export async function verifyToken(token: string) {
  const key = await preparePublicKey;
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ES512],
  });
  return payload;
}
