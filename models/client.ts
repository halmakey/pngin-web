import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.PNGIN_AWS_REGION,
  credentials: {
    accessKeyId: process.env.PNGIN_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.PNGIN_AWS_SECRET_ACCESS_KEY!,
  },
});

export const TableName = "pngin-web";
export const ByTypeIndexName = "byType";

export type InputSource<T> = Omit<T, "type" | "createdAt" | "updatedAt">

export function nowISOString(): string {
  return new Date().toISOString();
}

export function withCreatedUpdatedAt<T>(
  source: T & { createdAt?: string }
): Omit<T, "createdAt"> & { createdAt: string; updatedAt: string } {
  const now = nowISOString();
  return {
    ...source,
    createdAt: source.createdAt || now,
    updatedAt: now,
  };
}

export default client;
