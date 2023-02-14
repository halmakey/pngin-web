import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function signout(_: NextApiRequest, res: NextApiResponse) {
  return res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      path: "/",
    })
  ).redirect("/");
}

export default signout;
