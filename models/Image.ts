import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { nanoid } from "nanoid";
import { getClient, TableName } from "./client";
import { UserID } from "./User";

export const type = "image" as const;
export type PKey = `image:${string}`;

export interface Image {
  pkey: PKey;
  type: typeof type;
  id: string;
  userId: UserID;
  timestamp: number;
}

function getPKey(imageId: string): PKey {
  return `image:${imageId}`;
}

export async function getImage(id: string): Promise<Image | undefined> {
  const result = await getClient().send(
    new GetItemCommand({
      TableName,
      Key: {
        pkey: {
          S: getPKey(id),
        },
      },
    })
  );
  return result.Item && (unmarshall(result.Item) as Image);
}

export async function createImage(userId: UserID) {
  const id = nanoid();
  const pkey = getPKey(id);

  const item: Image = {
    pkey,
    type: "image",
    id,
    userId,
    timestamp: Date.now(),
  };

  await getClient().send(
    new PutItemCommand({
      TableName,
      Item: marshall(item),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  return item;
}

export async function deleteImage(id: string) {
  await getClient().send(
    new DeleteItemCommand({
      TableName,
      Key: marshall({ pkey: getPKey(id) }),
    })
  );
}
