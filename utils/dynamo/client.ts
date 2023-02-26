import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });

export const TableName = "pngin-web";
export const ByTypeIndexName = "byType";

export default client;
