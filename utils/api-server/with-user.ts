import * as User from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verifyUserToken } from "../token";

export function withUser<R = { [key: string]: never }>(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<R | { [key: string]: never }>,
    user: User.User
  ) => Promise<unknown>
): NextApiHandler<R | { [key: string]: never }> {
  return async (req, res) => {
    const { token } = req.cookies;
    const payload = token && (await verifyUserToken(token));
    const user =
      payload &&
      User.isUserID(payload.user.id) &&
      (await User.getUser(payload.user.id));
    if (!user) {
      return res.status(401).json({});
    }
    return handler(req, res, user);
  };
}
