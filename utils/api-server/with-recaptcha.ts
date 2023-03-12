import * as User from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getRemoteIp } from "../remoteip";
import { verifyUserToken } from "../token";
import { validateString } from "../validate";
import { verifyRecaptchaToken } from "@/utils/verify-recaptcha";

export function withRecaptcha<R = { [key: string]: never }>(
  action: string,
  handler: NextApiHandler<R | { [key: string]: never }>
): NextApiHandler<R | { [key: string]: never }> {
  return async (req, res) => {
    const response = validateString(req.body?.token);
    const remoteip = getRemoteIp(req);

    if (!response || !remoteip) {
      return res.status(400).json({});
    }

    const result = await verifyRecaptchaToken({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response,
      remoteip,
    });
    if (!result.success || result.action !== action) {
      console.error(result);
      return res.status(403).json({});
    }

    return handler(req, res);
  };
}
