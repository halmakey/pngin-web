import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = Buffer.from(
  process.env.PNGIN_JWT_PRIVATE_KEY!,
  "base64"
);
const JWT_PUBLIC_KEY = Buffer.from(process.env.PNGIN_JWT_PUBLIC_KEY!, "base64");

export function createToken(
  session: string,
  user: string,
  expiresIn: number
): string {
  const result = jwt.sign(
    {
      session,
      user,
      iat: Math.floor(Date.now() / 1000),
    },
    JWT_PRIVATE_KEY,
    {
      algorithm: "ES512",
      expiresIn,
    }
  );
  return result;
}

export async function verifyToken(token: string) {
  return jwt.verify(token, JWT_PUBLIC_KEY, {
    algorithms: ["ES512"],
  }) as jwt.JwtPayload;
}
