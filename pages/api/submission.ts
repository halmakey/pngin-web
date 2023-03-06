import { checkAllEnvs } from "@/utils/check-env";
import { verifyUserToken } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";
import * as Collection from "@/models/Collection";
import * as Submission from "@/models/Submission";
import * as User from "@/models/User";
import { verifyRecaptchaToken } from "@/utils/verify-recaptcha";
import { validateString } from "@/utils/validate";
import { API } from "@/types/api";

checkAllEnvs();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      return await postSubmissions(req, res);
    }
    return res.status(405).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({});
  }
}

async function postSubmissions(
  req: NextApiRequest,
  res: NextApiResponse<
    API.PostSubmissionResponseBody | { [key: string]: never }
  >
) {
  const collectionId = validateString(req.body?.collectionId);
  const response = validateString(req.body?.token);
  const name = validateString(req.body?.name, 1, 64);
  const comment = validateString(req.body?.comment, 0, 512);
  const addressInfo = req.socket.address();
  const remoteip = validateString(
    req.headers["x-real-ip"] ||
      ("address" in addressInfo && addressInfo.address)
  );

  console.log({ collectionId, response, remoteip });
  if (
    !Collection.isCollectionId(collectionId) ||
    !response ||
    !remoteip ||
    !name ||
    comment === undefined
  ) {
    return res.status(400).json({});
  }

  const { token } = req.cookies;
  const payload = token && (await verifyUserToken(token));
  const user = payload && (await User.getUser(payload.user.id));

  if (!payload || !user) {
    return res.status(401).json({});
  }

  const collection = await Collection.getCollection(collectionId);
  if (!collection) {
    return res.status(400).json({});
  }

  const result = await verifyRecaptchaToken({
    secret: process.env.RECAPTCHA_SECRET_KEY!,
    response,
    remoteip,
  });
  if (!result.success) {
    console.error(result);
    return res.status(403).json({});
  }

  const submission = await Submission.createSubmission({
    id: Submission.createSubmissionID(user.id, collectionId),
    name,
    comment,
  });

  return res.json({ submission });
}

export default handler;
