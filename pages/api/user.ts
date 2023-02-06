import { checkAllEnvs } from "@/utils/check-env";
import { resJson } from "@/utils/res-utils";
import { verifyToken } from "@/utils/token";
import { NextFetchEvent, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

checkAllEnvs();

async function handler(req: NextRequest, ev: NextFetchEvent) {
  if (req.method === "GET") {
    return await getMe(req, ev);
  }
  return resJson({}, 405);
}

async function getMe(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies.get("token")?.value;
  const payload = token && (await verifyToken(token));

  if (typeof payload !== "object" || typeof payload?.user !== "object") {
    return resJson({}, 401);
  }

  return resJson(payload.user);
}

export default handler;
