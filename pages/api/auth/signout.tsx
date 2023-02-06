import { NextFetchEvent, NextRequest } from "next/server";
import cookie from "cookie";
import { resRedirect } from "@/utils/res-utils";

export const config = {
  runtime: "edge",
};

async function signout(req: NextRequest, ev: NextFetchEvent) {
  const response = resRedirect(req.nextUrl.origin);
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      path: "/",
    })
  );

  return response;
}

export default signout;
