import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const TableName = "pngin-web";
export const ByTypeIndexName = "byType";

export type InputSource<T> = Omit<
  T,
  "pkey" | "type" | "id" | "timestamp"
>;

let client: DynamoDBClient;
export function getClient() {
  if (client) {
    return client;
  }
  client = new DynamoDBClient({
    region: process.env.PNGIN_AWS_REGION,
    credentials: {
      accessKeyId: process.env.PNGIN_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.PNGIN_AWS_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}
