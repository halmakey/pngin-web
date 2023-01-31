import { authorizeCodeGrant, getMe, getSignInUrl } from "@/utils/discord";
import {
  attachDiscordToSession,
  createSession,
  getSession,
} from "@/utils/session-store";
import { createToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

export default function SignInPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const { code, state } = query;

  // check parameters
  if (
    !code ||
    typeof code !== "string" ||
    !state ||
    typeof state !== "string"
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // check session records
  const session = await getSession(state);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // grant access
  try {
    const token = await authorizeCodeGrant(code);

    const me = await getMe(token.access_token);

    await attachDiscordToSession(session.id, token, me);

    const sessionToken = createToken(session.id, me.id, token.expires_in);
    const cookies = new Cookies(req, res);

    cookies.set("token", sessionToken, {
      maxAge: token.expires_in,
    });
  } catch (err) {
    console.error(err);
  } finally {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
