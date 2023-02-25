import { deleteSession } from "@/utils/appsync/session";
import "@/utils/configure-amplify";
import { configureAmplifyOnce } from "@/utils/configure-amplify";
import { verifySessionToken } from "@/utils/token";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function signout(req: NextApiRequest, res: NextApiResponse) {
  await configureAmplifyOnce();
  const token = req.cookies.token;
  if (token) {
    const payload = await verifySessionToken(token);
    if (payload) {
      await deleteSession(payload.session.id).catch(() => {
        /* NOP */
      });
    }
  }
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
    .redirect("/");
}

export default signout;
