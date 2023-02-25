import { createSession } from "@/utils/appsync/session";
import { configureAmplifyOnce } from "@/utils/configure-amplify";
import { getSignInUrl } from "@/utils/discord";
import { generateRandomHex } from "@/utils/random";
import { createSessionToken } from "@/utils/token";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

// 1h
const Age1H = 60 * 60;

async function signin(req: NextApiRequest, res: NextApiResponse) {
  await configureAmplifyOnce()

  const nonce = generateRandomHex(32);

  const now = Date.now();

  const session = await createSession({
    expireAt: new Date(now + Age1H * 1000).toISOString(),
    nonce
  })

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
