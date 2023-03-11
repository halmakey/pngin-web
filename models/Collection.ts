import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { nanoid } from "nanoid";
import {
  getClient,
  ByTypeIndexName,
  InputSource,
  TableName,
  withCreatedUpdatedAt,
} from "./client";

export const type = "collection" as const;
export type PKey = `collection:${string}`;

export interface Collection {
  pkey: PKey;
  type: typeof type;
  id: string;
  name: string;
  sequence: number;
  createdAt: string;
  updatedAt: string;
  startCallAt?: string;
  endCallAt?: string;
}

function getPKey(collectionId: string): PKey {
  return `collection:${collectionId}`;
}

export async function listAllCollection(): Promise<Collection[]> {
  const result = await getClient().send(
    new QueryCommand({
      TableName,
      IndexName: ByTypeIndexName,
      KeyConditions: {
        type: {
          AttributeValueList: [{ S: type }],
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
  id: string
): Promise<Collection | undefined> {
  const result = await getClient().send(
    new GetItemCommand({
      TableName,
      Key: marshall({ pkey: getPKey(id) }),
    })
  );
  return result.Item && (unmarshall(result.Item) as Collection);
}

export async function createCollection(
  input: InputSource<Collection>
): Promise<Collection> {
  const id = nanoid(7)
  const item = withCreatedUpdatedAt({
    ...input,
    pkey: getPKey(id),
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
