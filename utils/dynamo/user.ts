import {
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, { TableName } from "./client";

export type UserID = `user-${string}`;

export interface User {
  type: "user";
  id: UserID;
  name: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUser(id: UserID): Promise<User | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: {
        id: {
          S: id,
        },
      },
    })
  );
  return result.Item && (unmarshall(result.Item) as User);
}

export async function createUser(
  input: Omit<User, "type" | "createdAt" | "updatedAt">
): Promise<User> {
  const now = new Date().toISOString();
  const item: User = {
    ...input,
    type: "user",
    createdAt: now,
    updatedAt: now,
  };
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall(item),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return item;
}

export async function updateUser(input: {
  id: UserID;
  name: string;
  avatarUrl: string;
}): Promise<User> {
  const now = new Date().toISOString();
  const result = await client.send(
    new UpdateItemCommand({
      TableName,
      Key: { id: { S: input.id } },
      AttributeUpdates: {
        name: {
          Value: { S: input.name },
        },
        updatedAt: {
          Value: { S: now },
        },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as User;
}
