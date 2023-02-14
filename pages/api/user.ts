import { checkAllEnvs } from "@/utils/check-env";
import { verifyToken } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";

checkAllEnvs();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await getMe(req, res);
  }
  return res.status(405).json({});
}

async function getMe(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.cookies;
  const payload = token && (await verifyToken(token));

  if (typeof payload !== "object" || typeof payload?.user !== "object") {
    return res.status(401).json({});
  }

  return res.json(payload.user);
}

export default handler;
