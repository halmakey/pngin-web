import { authorizeCodeGrant, getAvatarUrl, getMe } from "@/utils/discord";
import { getSession, updateSession } from "@/models/session";
import { createUser, getUser, updateUser } from "@/models/user";
import { createUserSessionToken, verifySessionToken } from "@/utils/token";
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

    const payload = await verifySessionToken(state);
    if (!payload) {
      throw new Error("invalid state: " + state);
    }

    let session = await getSession(payload.session.id);
    if (!session) {
      throw new Error("Session not found: " + state);
    }

    const now = new Date();

    if (session.ttl < now.valueOf() / 1000) {
      throw new Error("Session expired");
    }
    if (session?.nonce !== payload.session.nonce) {
      throw new Error("Session nonce unmatched");
    }
    if (!!session.userId) {
      throw new Error("Session already logged-in as " + session.userId);
    }

    const userName = me.username + "#" + me.discriminator;
    const userAvatarUrl =
      (me.avatar && getAvatarUrl(me.id, me.avatar)) || "/anonymous.svg";

    const userId = `user-${me.id}` as const;
    let user = await getUser(userId);
    if (!user) {
      user = await createUser({
        id: userId,
        name: userName,
        avatarUrl: userAvatarUrl,
      });
    } else {
      user = await updateUser({
        id: userId,
        name: userName,
        avatarUrl: userAvatarUrl,
      });
    }

    session = await updateSession({
      id: session.id,
      userId,
    });

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
      .redirect(payload.callback || "/");
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
}

export default callback;
