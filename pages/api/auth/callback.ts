import { getSession, updateSession } from "@/utils/appsync/session";
import { findUserByDiscordId, updateUser } from "@/utils/appsync/user";
import { configureAmplifyOnce } from "@/utils/configure-amplify";
import { authorizeCodeGrant, getAvatarUrl, getMe } from "@/utils/discord";
import { createUserSessionToken, verifySessionToken } from "@/utils/token";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


async function callback(req: NextApiRequest, res: NextApiResponse) {
  await configureAmplifyOnce()

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

    const payload = await verifySessionToken(state);
    if (!payload) {
      throw new Error("invalid state: " + state);
    }

    let session = await getSession(payload.session.id);
    if (!session) {
      throw new Error("Session not found: " + state);
    }

    const now = new Date();

    if (new Date(session.expireAt) < now) {
      throw new Error("Session expired");
    }
    if (session?.nonce !== payload.session.nonce) {
      throw new Error("Session nonce unmatched");
    }
    if (!!session.userID) {
      throw new Error("Session already logged-in as " + session.userID);
    }

    const existUser = await findUserByDiscordId(me.id);
    const userName = me.username + "#" + me.discriminator;
    const userAvatarUrl =
      (me.avatar && getAvatarUrl(me.id, me.avatar)) || "/anonymous.svg";

    const user = await updateUser({
      id: me.id,
      name: userName,
      discordId: me.id,
      avatarUrl: userAvatarUrl,
      createdAt: existUser?.createdAt ?? now.toISOString(),
      updatedAt: now.toISOString()
    })

    session = await updateSession({
      id: session.id,
      createdAt: session.createdAt,
      updatedAt: now.toISOString(),
      expireAt: new Date(
        now.valueOf() + token.expires_in * 1000
      ).toISOString(),
      nonce: session.nonce,
      userID: me.id
    })

    const sessionToken = await createUserSessionToken(
      session,
      user,
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
