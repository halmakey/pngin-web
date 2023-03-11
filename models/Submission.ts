import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  getClient,
  InputSource,
  nowISOString,
  TableName,
  withCreatedUpdatedAt,
} from "./client";

export const type = "submission" as const;
export type SubmissionID = `${string}:${string}`;
export type PKey = `submission:${SubmissionID}`;

export interface Submission {
  pkey: PKey;
  type: typeof type;
  id: SubmissionID;
  createdAt: string;
  updatedAt: string;
  name: string;
  comment: string;
  imageId?: string;
}

function getPKey(userId: string, collectionId: string): PKey {
  return `submission:${getSubmissionID(userId, collectionId)}`;
}

export function getSubmissionID(
  userId: string,
  collectionId: string
): SubmissionID {
  return `${collectionId}:${userId}`;
}

export async function getSubmission(
  userId: string,
  collectionId: string
): Promise<Submission | undefined> {
  const result = await getClient().send(
    new GetItemCommand({
      TableName,
      Key: {
        pkey: {
          S: getPKey(userId, collectionId),
        },
      },
    })
  );
  return result.Item && (unmarshall(result.Item) as Submission);
}

export async function createSubmission(
  userId: string,
  collectionId: string,
  input: InputSource<Submission>
): Promise<Submission> {
  const id = getSubmissionID(userId, collectionId);
  const submission = withCreatedUpdatedAt({
    ...input,
    pkey: `submission:${id}` as const,
    id,
    type,
  });
  await getClient().send(
    new PutItemCommand({
      TableName,
      Item: marshall(submission),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return submission;
}

export async function updateSubmission(
  userId: string,
  collectionId: string,
  input: {
    name: string;
    comment: string;
    file?: string;
  }
): Promise<Submission> {
  const result = await getClient().send(
    new UpdateItemCommand({
      TableName,
      Key: { pkey: { S: getPKey(userId, collectionId) } },
      AttributeUpdates: {
        name: {
          Value: { S: input.name },
        },
        comment: {
          Value: { S: input.comment },
        },
        file: {
          Value: input.file ? { S: input.file } : { NULL: false },
        },
        updatedAt: {
          Value: { S: nowISOString() },
        },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    })
  );
  return unmarshall(result.Attributes!) as Submission;
}

export async function deleteSubmission({
  userId,
  collectionId,
}: {
  userId: string;
  collectionId: string;
}) {
  await getClient()
    .send(
      new DeleteItemCommand({
        TableName,
        Key: { pkey: { S: getPKey(userId, collectionId) } },
      })
    )
    .catch(() => {
      /*NOP*/
    });
}
