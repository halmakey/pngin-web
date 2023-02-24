import { Session, User } from "@/models";
import { getDataStore } from "@/utils/configure-amplify";
import { authorizeCodeGrant, getAvatarUrl, getMe } from "@/utils/discord";
import { generateRandomHex } from "@/utils/random";
import {
  createSessionToken,
  createUserSessionToken,
  verifySessionToken,
} from "@/utils/token";
import { SortDirection } from "aws-amplify";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function callback(req: NextApiRequest, res: NextApiResponse) {
  const DataStore = await getDataStore()

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

    let session = await DataStore.query(Session, payload.session.id);
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

    const existUser = (
      await DataStore.query(User, (u) => u.discordId.eq(me.id), {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      })
    )[0];
    const userName = me.username + "#" + me.discriminator;
    const userAvatarUrl =
      (me.avatar && getAvatarUrl(me.id, me.avatar)) || "/anonymous.svg";

    const user = await DataStore.save(
      existUser
        ? User.copyOf(existUser, (u) => {
            u.updatedAt = now.toISOString();
            u.name = userName;
            u.avatarUrl = userAvatarUrl;
          })
        : new User({
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            discordId: me.id,
            name: userName,
            avatarUrl: userAvatarUrl,
          })
    );

    session = Session.copyOf(session, (s) => {
      (s.nonce = generateRandomHex(32)), (s.updatedAt = now.toISOString());
      s.userID = user.id;
      s.expireAt = new Date(
        now.valueOf() + token.expires_in * 1000
      ).toISOString();
    });

    await DataStore.save(session);

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
