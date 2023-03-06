import {
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, { InputSource, TableName, withCreatedUpdatedAt } from "./client";

export const type = "user" as const;
export type UserID = `user-${string}`;

export interface User {
  type: typeof type;
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

export async function createUser(input: InputSource<User>): Promise<User> {
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
        avatarUrl: {
          Value: { S: input.avatarUrl },
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
