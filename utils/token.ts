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

export async function createToken(
  session: string,
  expiresIn: number
): Promise<string> {
  const key = await preparePrivateKey;
  const jwt = await new SignJWT({
    session,
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
  if ((payload.exp ?? 0) > Math.floor(Date.now() / 1000)) {
    throw new Error("Expired");
  }
  return payload as { session: string };
}
