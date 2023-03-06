import { checkAllEnvs } from "@/utils/check-env";
import { UserPayload, verifyUserToken } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";

checkAllEnvs();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      return await getMe(req, res);
    }
    return res.status(405).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({});
  }
}

async function getMe(
  req: NextApiRequest,
  res: NextApiResponse<UserPayload | { [key: string]: never }>
) {
  const { token } = req.cookies;
  const payload = token && (await verifyUserToken(token));

  if (!payload) {
    return res.status(401).json({});
  }

  return res.json(payload.user);
}

export default handler;
