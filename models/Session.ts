import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, {
  InputSource,
  nowISOString,
  TableName,
  withCreatedUpdatedAt,
} from "./client";
import type { UserID } from "./User";

export const type = "session" as const;
export type SessionID = `session-${string}`;

export interface Session {
  type: typeof type;
  id: SessionID;
  nonce: string;
  createdAt: string;
  updatedAt: string;
  userId?: UserID;
  ttl: number;
}

export async function getSession(id: SessionID): Promise<Session | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: marshall({ id }),
    })
  );
  return result.Item && (unmarshall(result.Item) as Session);
}

export async function createSession(
  input: InputSource<Session>
): Promise<Session> {
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

export async function updateSession(input: {
  id: SessionID;
  userId: UserID;
}): Promise<Session> {
  const result = await client.send(
    new UpdateItemCommand({
      TableName,
      Key: { id: { S: input.id } },
      AttributeUpdates: {
        updatedAt: { Value: { S: nowISOString() } },
        userId: { Value: { S: input.userId } },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as Session;
}

export async function deleteSession(id: SessionID): Promise<void> {
  await client.send(
    new DeleteItemCommand({
      TableName,
      Key: marshall({ id }),
    })
  );
}
