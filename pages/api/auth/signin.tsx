import { getSignInUrl } from "@/utils/discord";
import { verifyToken } from "@/utils/token";
import { NextFetchEvent, NextRequest } from "next/server";
import cookie from "cookie";
import { nanoid } from "nanoid";
import { resRedirect } from "@/utils/res-utils";

export const config = {
  runtime: "edge",
};

async function signin(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies.get("token")?.value;
  const payload = token && (await verifyToken(token).catch(() => undefined));

  if (payload) {
    return Response.redirect(req.nextUrl.origin, 302);
  }

  const state = nanoid();
  const signInUrl = getSignInUrl(req.nextUrl.origin, state);

  const response = resRedirect(signInUrl, 302);
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      path: "/"
    })
  );

  return response;
}

export default signin;
