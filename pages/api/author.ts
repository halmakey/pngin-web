import { checkAllEnvs } from "@/utils/check-env";
import { NextApiRequest, NextApiResponse } from "next";
import * as Collection from "@/models/Collection";
import * as Author from "@/models/Author";
import * as Image from "@/models/Image";
import { validateNanoID, validateString } from "@/utils/validate";
import { API } from "@/types/api";
import { getRemoteIp } from "@/utils/remoteip";
import { withUser } from "@/utils/api-server/with-user";
import { withRecaptcha } from "@/utils/api-server/with-recaptcha";

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

const putAuthor = withRecaptcha(
  "submit",
  withUser<API.PutAuthorResponseBody | { [key: string]: never }>(
    async (req, res, user) => {
      const collectionId = validateNanoID(req.body?.collectionId);
      const name = validateString(req.body?.name, 1, 64);
      const comment = validateString(req.body?.comment, 0, 512);
      const imageId = validateNanoID(req.body?.imageId);
      const collection =
        collectionId && (await Collection.getCollection(collectionId));
      const image = imageId && (await Image.getImage(imageId));

      if (
        !collectionId ||
        !name ||
        !imageId ||
        comment === undefined ||
        !collection ||
        !image
      ) {
        return res.status(400).json({});
      }

      const author = await Author.putAuthor(collection.id, user.id, {
        name,
        comment,
        userId: user.id,
        collectionId,
        imageId,
      });

      return res.json({ author });
    }
  )
);

const deleteAuthor = withRecaptcha(
  "delete",
  withUser(async (req, res, user) => {
    const collectionId = validateNanoID(req.body?.collectionId);
    const response = validateString(req.body?.token);
    const remoteip = getRemoteIp(req);
    const collection =
      collectionId && (await Collection.getCollection(collectionId));
    if (!collection || !response || !remoteip) {
      console.log({ collection, response, remoteip });
      return res.status(400).json({});
    }

    // TODO: delete all images

    await Author.deleteAuthor(collection.id, user.id);
    res.json({});
  })
);

export default handler;
