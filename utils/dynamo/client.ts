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

export default client;
