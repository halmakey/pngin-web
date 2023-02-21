import { Session } from "@/models";
import "@/utils/configure-amplify";
import { verifySessionToken, verifyUserToken } from "@/utils/token";
import { DataStore } from "aws-amplify";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function signout(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (token) {
    const payload = await verifySessionToken(token);
    if (payload) {
      await DataStore.delete(Session, payload.session.id).catch(() => {
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
