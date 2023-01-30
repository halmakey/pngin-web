import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import type { APIUser } from "discord.js";
import { nanoid } from "nanoid";
import { getAvatarUrl } from "./discord";

const GUEST_SESSION_AGE = 60 * 60;

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
  user?: {
    id: string;
    username: string;
    displayName?: string;
    discriminator: string;
    avatarUrl: string | null;
  };
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
  if (!item) {
    return undefined;
  }

  const ttl = Number(item.ttl.N);
  const userJson = JSON.parse(item.user?.S || "null") as APIUser | null;

  if (!userJson) {
    return {
      id,
      ttl,
    };
  }

  return {
    id,
    ttl,
    user: {
      id: userJson.id,
      username: userJson.username,
      displayName: (userJson as any).display_name,
      discriminator: userJson.discriminator,
      avatarUrl:
        (userJson.avatar && getAvatarUrl(userJson.id, userJson.avatar)) ||
        "/anonymous.svg",
    },
  };
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
    id: string;
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
        user: { S: JSON.stringify(user) },
      },
      ConditionExpression: "attribute_exists(id)",
    })
  );
}

export async function revokeSession(id: string) {
  await client
    .send(
      new DeleteItemCommand({
        TableName,
        Key: {
          id: { S: id },
        },
      })
    )
    .catch((err) => console.warn(err));
}
