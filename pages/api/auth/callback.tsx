import { authorizeCodeGrant, getAvatarUrl, getMe } from "@/utils/discord";
import { createToken } from "@/utils/token";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function callback(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  // check parameters
  if (
    !code ||
    typeof code !== "string" ||
    !state ||
    typeof state !== "string"
  ) {
    return res.redirect("/");
  }

  // grant access
  try {
    req.headers.host;
    const token = await authorizeCodeGrant(code);

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

    return res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", sessionToken, {
          maxAge: token.expires_in,
          httpOnly: true,
          secure: true,
          path: "/",
        })
      )
      .redirect("/");
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
}

export default callback;
