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
  if (!code || !state) {
    const { id } = await createSession();
    const url = getSignInUrl(id);
    return {
      redirect: {
        permanent: false,
        destination: url,
      },
    };
  }

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
  const token = await authorizeCodeGrant(code).catch((err) => String(err));
  if (typeof token === "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const me = await getMe(token.access_token);

  await attachDiscordToSession(session.id, token, me);

  const sessionToken = createToken(session.id, me.id, token.expires_in);

  const cookies = new Cookies(req, res);

  cookies.set("token", sessionToken, {
    maxAge: token.expires_in,
  });

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
