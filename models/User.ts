import {
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  getClient,
  InputSource,
  TableName,
} from "./client";

export const type = "user" as const;
export type UserID = `discord-${string}`;
export type PKey = `user:${UserID}`;

export interface User {
  pkey: PKey;
  type: typeof type;
  timestamp: number;
  id: string;
  name: string;
  avatarUrl: string;
}

function getPKey(userId: UserID): PKey {
  return `user:${userId}`;
}

export function isUserID(userId: unknown): userId is UserID {
  return typeof userId === "string" && userId.startsWith("discord-");
}

export async function getUser(id: UserID): Promise<User | undefined> {
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
  return result.Item && (unmarshall(result.Item) as User);
}

export async function createUser(
  id: UserID,
  input: InputSource<User>
): Promise<User> {
  const item: User = ({
    ...input,
    pkey: getPKey(id),
    id,
    type,
    timestamp: Date.now(),
  });
  await getClient().send(
    new PutItemCommand({
      TableName,
      Item: marshall(item),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return item;
}

export async function updateUser(
  id: UserID,
  input: {
    name: string;
    avatarUrl: string;
  }
): Promise<User> {
  const result = await getClient().send(
    new UpdateItemCommand({
      TableName,
      Key: { pkey: { S: getPKey(id) } },
      AttributeUpdates: {
        name: {
          Value: { S: input.name },
        },
        avatarUrl: {
          Value: { S: input.avatarUrl },
        },
        timestamp: {
          Value: { N: Date.now().toString() },
        },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as User;
}
