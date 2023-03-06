import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, { InputSource, TableName, withCreatedUpdatedAt } from "./client";

export const type = "image" as const;

export type ImageID = `image-${string}`;

export interface Image {
  type: typeof type;
  id: ImageID;
  width: number;
  height: number;
  contentType: string;
  createdAt: string;
}

export function isImageId(id: unknown): id is ImageID {
  return typeof id === "string" && id.startsWith("image-");
}

export async function getImage(id: ImageID): Promise<Image | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: marshall({ id }),
    })
  );
  return result.Item && (unmarshall(result.Item) as Image);
}

export async function createImage(input: InputSource<Image>): Promise<Image> {
  const item = withCreatedUpdatedAt({
    ...input,
    type,
  });
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall(item),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return item;
}
