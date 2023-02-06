import { authorizeCodeGrant, getAvatarUrl, getMe } from "@/utils/discord";
import { createToken } from "@/utils/token";
import { NextFetchEvent, NextRequest } from "next/server";
import cookie from "cookie";
import { resRedirect } from "@/utils/res-utils";

export const config = {
  runtime: "edge",
};

async function callback(req: NextRequest, ev: NextFetchEvent) {
  const url = new URL(req.url!);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  // check parameters
  if (
    !code ||
    typeof code !== "string" ||
    !state ||
    typeof state !== "string"
  ) {
    console.log("not found!!!!");
    return Response.redirect("http://localhost:3000", 302);
  }

  // grant access
  try {
    const token = await authorizeCodeGrant(url.origin, code);

    const me = await getMe(token.access_token);

    // await attachDiscordToSession(session.id, token, me);

    const sessionToken = await createToken(
      {
        id: me.id,
        username: me.username,
        displayName:
          "display_name" in me ? (me.display_name as string) : undefined,
        discriminator: me.discriminator,
        avatarUrl:
          (me.avatar && getAvatarUrl(me.id, me.avatar)) || "/anonymous.svg",
      },
      token.expires_in
    );

    const response = resRedirect("http://localhost:3000");
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", sessionToken, {
        maxAge: token.expires_in,
        httpOnly: true,
        secure: true,
        path: "/",
      })
    );
    return response;
  } catch (err) {
    console.error(err);
    return Response.redirect("http://localhost:3000", 302);
  }
}

export default callback;
