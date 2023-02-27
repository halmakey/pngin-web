import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, { ByTypeIndexName, TableName } from "./client";

export type CollectionID = `collection-${string}`;

export interface Collection {
  type: "collection";
  id: CollectionID;
  name: string;
  sequence: number;
  createdAt: string;
  updatedAt: string;
  startCallAt?: string;
  endCallAt?: string;
}

export function isCollectionId(id: unknown): id is CollectionID {
  return typeof id === 'string' && id.startsWith("collection-")
}

export async function listAllCollection(): Promise<Collection[]> {
  const result = await client.send(
    new QueryCommand({
      TableName,
      IndexName: ByTypeIndexName,
      KeyConditions: {
        type: {
          AttributeValueList: [{ S: "collection" }],
          ComparisonOperator: "EQ",
        },
      },
    })
  );
  return (
    (result.Items && result.Items.map((i) => unmarshall(i) as Collection)) ?? []
  );
}

export async function getCollection(
  id: CollectionID
): Promise<Collection | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: marshall({ id }),
    })
  );
  return result.Item && (unmarshall(result.Item) as Collection);
}

export async function createCollection(
  input: Omit<Collection, "type" | "createdAt" | "updatedAt">
): Promise<Collection> {
  const now = new Date().toISOString();
  const item: Collection = {
    ...input,
    type: "collection",
    createdAt: now,
    updatedAt: now,
  };
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall(item),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return item;
}
