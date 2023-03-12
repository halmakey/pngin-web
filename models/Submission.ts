import { DeleteItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { AuthorID } from "./Author";
import { getClient, TableName } from "./client";

export const type = "submission" as const;
export type PKey = `submission:${string}`;

export interface Submission {
  pkey: PKey;
  type: typeof type;
  authorId: AuthorID;
  imageId: string;
  timestamp: number;
}

function getPKey(authorId: AuthorID, imageId: string): PKey {
  return `submission:${authorId}:${imageId}`;
}

export async function createSubmission(authorId: AuthorID, imageId: string) {
  const pkey = getPKey(authorId, imageId);

  const item: Submission = {
    pkey,
    type: "submission",
    authorId,
    imageId,
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

export async function removeSubmission(authorId: AuthorID, imageId: string) {
  await getClient().send(
    new DeleteItemCommand({
      TableName,
      Key: marshall({ pkey: getPKey(authorId, imageId) }),
    })
  );
}
