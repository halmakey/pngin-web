import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export const TableName = "pngin-web"
export const ByTypeIndexName = "byType"

export default client;
