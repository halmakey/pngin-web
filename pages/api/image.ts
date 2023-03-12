import { NextApiRequest, NextApiResponse } from "next";
import * as Image from "@/models/Image";
import { API } from "@/types/api";
import { withRecaptcha } from "@/utils/api-server/with-recaptcha";
import { withUser } from "@/utils/api-server/with-user";
import { validateNanoID } from "@/utils/validate";
import { checkAllEnvs } from "@/utils/check-env";
import { createS3AppClient } from "@/utils/s3-app-client";

checkAllEnvs();

const s3AppClient = createS3AppClient({
  region: process.env.PNGIN_AWS_REGION!,
  accessKeyId: process.env.PNGIN_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.PNGIN_AWS_SECRET_ACCESS_KEY!,
  bucketName: "pngin-image",
});

const MAX_IMAGE_SIZE = 1024 * 1024 * 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        return await postImage(req, res);
      case "DELETE":
        return await deleteImage(req, res);
    }
    return res.status(405).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({});
  }
}

const postImage = withRecaptcha(
  "postimage",
  withUser<API.PostImageResponseBody>(async (req, res, user) => {
    const image = await Image.createImage(user.id);
    const objectName = image.id + ".png"
    const post = await s3AppClient.generateSignedPostUrl(
      objectName,
      "image/png",
      MAX_IMAGE_SIZE
    );

    res.json({
      post,
      image,
    });
  })
);

const deleteImage = withRecaptcha(
  "deleteimage",
  withUser(async (req, res, user) => {
    const imageId = validateNanoID(req.body?.imageId);
    const image = imageId && (await Image.getImage(imageId));
    if (!image || image.userId !== user.id) {
      return res.status(400).json({});
    }
    const objectName = image.id + ".png"

    await s3AppClient.deleteObject(objectName);
    await Image.deleteImage(imageId).catch((err) => console.warn(err));
    res.json({});
  })
);
