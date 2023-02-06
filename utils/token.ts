import { ApiUser } from "@/types/api/user";
import { SignJWT, importJWK, jwtVerify, base64url } from "jose";
import { nanoid } from "nanoid";

const JWT_PRIVATE_KEY = new TextDecoder().decode(
  base64url.decode(process.env.PNGIN_JWT_PRIVATE_KEY!)
);
const JWT_PUBLIC_KEY = new TextDecoder().decode(
  base64url.decode(process.env.PNGIN_JWT_PUBLIC_KEY!)
);

const ES512 = "ES512";
const STATE_AGE_SEC = 60 * 60;

const preparePrivateKey = importJWK(JSON.parse(JWT_PRIVATE_KEY), ES512);
const preparePublicKey = importJWK(JSON.parse(JWT_PUBLIC_KEY), ES512);

export async function createToken(
  user: ApiUser,
  expiresIn: number
): Promise<string> {
  const key = await preparePrivateKey;
  const jwt = await new SignJWT({
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
  return payload as { user: ApiUser };
}
