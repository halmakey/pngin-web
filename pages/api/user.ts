import { ApiUser } from "@/types/api/user";
import { getSession, Session } from "@/utils/session-store";
import { verifyToken } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await getMe(req, res);
  }
  res.status(405).json({});
}

async function getMe(req: NextApiRequest, res: NextApiResponse<ApiUser | {}>) {
  const token = req.cookies.token;

  let session: Session | undefined;
  if (token) {
    const payload = await verifyToken(token).catch(() => undefined);
    session = payload && (await getSession(payload.session));
  }
  if (!session?.user) {
    res.status(404).json({});
    return;
  }
  res.json(session.user);
}

export default handler;
