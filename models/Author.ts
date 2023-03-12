import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { getClient, InputSource, TableName } from "./client";
import { UserID } from "./User";

export const type = "author" as const;
export type AuthorID = `${string}:${string}`;
export type PKey = `author:${AuthorID}`;

export interface Author {
  pkey: PKey;
  type: typeof type;
  id: AuthorID;
  collectionId: string;
  userId: UserID;
  name: string;
  timestamp: number;
  comment: string;
  imageId: string;
}

function getPKey(collectionId: string, userId: string): PKey {
  return `author:${getAuthorID(collectionId, userId)}`;
}

export function getAuthorID(collectionId: string, userId: string): AuthorID {
  return `${collectionId}:${userId}`;
}

export async function getAuthor(
  collectionId: string,
  userId: string
): Promise<Author | undefined> {
  const result = await getClient().send(
    new GetItemCommand({
      TableName,
      Key: {
        pkey: {
          S: getPKey(collectionId, userId),
        },
      },
    })
  );
  return result.Item && (unmarshall(result.Item) as Author);
}

export async function putAuthor(
  collectionId: string,
  userId: string,
  input: InputSource<Author>
): Promise<Author> {
  const id = getAuthorID(collectionId, userId);
  const author: Author = {
    ...input,
    pkey: `author:${id}` as const,
    id,
    type,
    timestamp: Date.now(),
  };
  await getClient().send(
    new PutItemCommand({
      TableName,
      Item: marshall(author),
    })
  );
  return author;
}

export async function deleteAuthor(collectionId: string, userId: string) {
  await getClient()
    .send(
      new DeleteItemCommand({
        TableName,
        Key: { pkey: { S: getPKey(collectionId, userId) } },
      })
    )
    .catch(() => {
      /*NOP*/
    });
}
