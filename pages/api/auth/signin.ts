import { getSignInUrl } from "@/utils/discord";
import { createSession } from "@/utils/dynamo/session";
import { generateRandomHex } from "@/utils/random";
import { createSessionToken } from "@/utils/token";
import cookie from "cookie";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

// 1h
const Age1H = 60 * 60;

async function signin(req: NextApiRequest, res: NextApiResponse) {
  const id = `session-${nanoid()}` as const;
  const nonce = generateRandomHex(32);
  const now = Date.now();

  const session = await createSession({
    id,
    nonce,
    ttl: Math.floor(now / 1000) + Age1H,
  });

  const state = await createSessionToken(session, Age1H);
  const signInUrl = getSignInUrl(state);

  return res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        path: "/",
      })
    )
    .redirect(signInUrl);
}

export default signin;
