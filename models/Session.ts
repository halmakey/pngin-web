import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { nanoid } from "nanoid";
import {
  getClient,
  InputSource,
  nowISOString,
  TableName,
  withCreatedUpdatedAt,
} from "./client";

export const type = "session" as const;
export type PKey = `session:${string}`;

export interface Session {
  pkey: PKey;
  type: typeof type;
  id: string;
  nonce: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  ttl: number;
}

function getPKey(sessionId: string): PKey {
  return `session:${sessionId}`;
}

export async function getSession(
  sessionId: string
): Promise<Session | undefined> {
  const result = await getClient().send(
    new GetItemCommand({
      TableName,
      Key: marshall({ pkey: getPKey(sessionId) }),
    })
  );
  return result.Item && (unmarshall(result.Item) as Session);
}

export async function createSession(
  input: InputSource<Session>
): Promise<Session> {
  const id = nanoid()
  const pkey = getPKey(id);
  const item = withCreatedUpdatedAt({
    ...input,
    pkey,
    id,
    type,
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

export async function updateSession(input: {
  id: string;
  userId: string;
}): Promise<Session> {
  const result = await getClient().send(
    new UpdateItemCommand({
      TableName,
      Key: { pkey: { S: getPKey(input.id) } },
      AttributeUpdates: {
        updatedAt: { Value: { S: nowISOString() } },
        userId: { Value: { S: input.userId } },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as Session;
}

export async function deleteSession(id: string): Promise<void> {
  await getClient().send(
    new DeleteItemCommand({
      TableName,
      Key: marshall({ pkey: getPKey(id) }),
    })
  );
}
