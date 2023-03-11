import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  getClient,
  InputSource,
  nowISOString,
  TableName,
  withCreatedUpdatedAt,
} from "./client";

export const type = "author" as const;
export type AuthorID = `${string}:${string}`;
export type PKey = `author:${AuthorID}`;

export interface Author {
  pkey: PKey;
  type: typeof type;
  id: AuthorID;
  createdAt: string;
  updatedAt: string;
  name: string;
  comment: string;
  imageId?: string;
}

function getPKey(userId: string, collectionId: string): PKey {
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

export async function createAuthor(
  collectionId: string,
  userId: string,
  input: InputSource<Author>
): Promise<Author> {
  const id = getAuthorID(userId, collectionId);
  const author = withCreatedUpdatedAt({
    ...input,
    pkey: `author:${id}` as const,
    id,
    type,
  });
  await getClient().send(
    new PutItemCommand({
      TableName,
      Item: marshall(author),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return author;
}

export async function updateAuthor(
  collectionId: string,
  userId: string,
  input: {
    name: string;
    comment: string;
    file?: string;
  }
): Promise<Author> {
  const result = await getClient().send(
    new UpdateItemCommand({
      TableName,
      Key: { pkey: { S: getPKey(collectionId, userId) } },
      AttributeUpdates: {
        name: {
          Value: { S: input.name },
        },
        comment: {
          Value: { S: input.comment },
        },
        file: {
          Value: input.file ? { S: input.file } : { NULL: false },
        },
        updatedAt: {
          Value: { S: nowISOString() },
        },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as Author;
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
