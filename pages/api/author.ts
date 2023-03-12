import { checkAllEnvs } from "@/utils/check-env";
import { verifyUserToken } from "@/utils/token";
import { NextApiRequest, NextApiResponse } from "next";
import * as Collection from "@/models/Collection";
import * as Author from "@/models/Author";
import * as User from "@/models/User";
import { verifyRecaptchaToken } from "@/utils/verify-recaptcha";
import { validateNanoID, validateString } from "@/utils/validate";
import { API } from "@/types/api";
import { getRemoteIp } from "@/utils/remoteip";

checkAllEnvs();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "PUT":
        return await putAuthor(req, res);
      case "DELETE":
        return await deleteAuthor(req, res);
    }
    return res.status(405).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({});
  }
}

async function putAuthor(
  req: NextApiRequest,
  res: NextApiResponse<
    API.PutAuthorResponseBody | { [key: string]: never }
  >
) {
  const collectionId = validateNanoID(req.body?.collectionId);
  const response = validateString(req.body?.token);
  const name = validateString(req.body?.name, 1, 64);
  const comment = validateString(req.body?.comment, 0, 512);
  const remoteip = getRemoteIp(req);

  if (
    !collectionId ||
    !response ||
    !remoteip ||
    !name ||
    comment === undefined
  ) {
    return res.status(400).json({});
  }

  const { token } = req.cookies;
  const payload = token && (await verifyUserToken(token));
  const user =
    payload &&
    User.isUserID(payload.user.id) &&
    (await User.getUser(payload.user.id));
  if (!user) {
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
  if (!result.success || result.action !== "submit") {
    console.error(result);
    return res.status(403).json({});
  }

  const author = await Author.putAuthor(collection.id, user.id, {
    name,
    comment,
    userId: user.id,
    collectionId
  });

  return res.json({ author });
}

async function deleteAuthor(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: never }>
) {
  const collectionId = validateNanoID(req.body?.collectionId);
  const response = validateString(req.body?.token);
  const remoteip = getRemoteIp(req);
  const collection =
    collectionId && (await Collection.getCollection(collectionId));
  if (!collection || !response || !remoteip) {
    console.log({ collection, response, remoteip });
    return res.status(400).json({});
  }

  const { token } = req.cookies;
  const payload = token && (await verifyUserToken(token));
  const user =
    payload &&
    User.isUserID(payload.user.id) &&
    (await User.getUser(payload.user.id));
  if (!user) {
    return res.status(401).json({});
  }

  const result = await verifyRecaptchaToken({
    secret: process.env.RECAPTCHA_SECRET_KEY!,
    response,
    remoteip,
  });
  if (!result.success || result.action !== "delete") {
    console.error(result);
    return res.status(403).json({});
  }

  // TODO: delete all images

  await Author.deleteAuthor(collection.id, user.id);
  res.json({});
}

export default handler;
