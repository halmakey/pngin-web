import { authorizeCodeGrant, getMe, getSignInUrl } from "@/utils/discord";
import {
  createSession,
  revokeSession,
} from "@/utils/session-store";
import { verifyToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

export default function SignInPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  const token = req.cookies.token;
  let sessionId: string | undefined;
  if (token) {
    const payload = await verifyToken(token).catch(() => undefined);
    sessionId = payload?.session;
  }

  if (sessionId) {
    await revokeSession(sessionId);
  }

  const cookies = new Cookies(req, res);
  cookies.set("token");

  const { id } = await createSession();
  const url = getSignInUrl(id);
  return {
    redirect: {
      permanent: false,
      destination: url,
    },
  };
};
