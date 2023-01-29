import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { access } from "fs";
import { nanoid } from "nanoid";

const GUEST_SESSION_AGE = 60 * 60;
const ACTIVE_SESSION_AGE = 60 * 60 * 24 * 30;

const client = new DynamoDBClient({
  region: process.env.PNGIN_AWS_REGION,
  credentials: {
    accessKeyId: process.env.PNGIN_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.PNGIN_AWS_SECRET_ACCESS_KEY!,
  },
});
const TableName = process.env.PNGIN_SESSION_TABLE_NAME;

export interface Session {
  id: string;
  ttl: number;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: number;
}

export async function createSession(): Promise<Session> {
  const id = nanoid();
  const ttl = Math.floor(Date.now() / 1000) + GUEST_SESSION_AGE;

  await client.send(
    new PutItemCommand({
      TableName,
      Item: {
        id: { S: id },
        ttl: { N: ttl + "" },
      },
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  return {
    id,
    ttl,
  };
}

export async function getSession(id: string): Promise<Session | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: {
        id: { S: id },
      },
    })
  );
  const item = result.Item;
  return (
    item && {
      id: item.id.S!,
      ttl: Number(item.ttl.N),
    }
  );
}

export async function attachDiscordToSession(
  id: string,
  token: {
    scope: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
  },
  user: {
    id: string
  }
) {
  const ttl = Math.floor(Date.now() / 1000) + token.expires_in;

  await client.send(
    new PutItemCommand({
      TableName,
      Item: {
        id: { S: id },
        ttl: { N: ttl.toString() },
        token: { S: JSON.stringify(token) },
        user: { S: JSON.stringify(user)}
      },
      ConditionExpression: "attribute_exists(id)",
    })
  );
}
