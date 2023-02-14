import { getSignInUrl } from "@/utils/discord";
import { verifyToken } from "@/utils/token";
import cookie from "cookie";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.cookies;
  const payload = token && (await verifyToken(token).catch(() => undefined));

  if (payload) {
    return res.redirect("/");
  }

  const state = nanoid();
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
