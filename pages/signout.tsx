import { revokeSession } from "@/utils/session-store";
import { verifyToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

export default function SignOutPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  const token = req.cookies.token;
  let sessionId: string | undefined;
  if (token) {
    const payload = await verifyToken(token).catch(() => undefined);
    sessionId = payload?.session;
  }

  if (sessionId) {
    await revokeSession(sessionId);
  }

  cookies.set("token");

  return {
    redirect: {
      permanent: false,
      destination: "/?refresh",
    },
  };
};
