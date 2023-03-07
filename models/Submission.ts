import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import client, {
  InputSource,
  nowISOString,
  TableName,
  withCreatedUpdatedAt,
} from "./client";
import { CollectionID } from "./Collection";
import type { ImageID } from "./Image";
import { UserID } from "./User";

export const type = "submission" as const;
export type SubmissionID = `submission-${string}-${string}`;

export function createSubmissionID(
  userId: string,
  collectionId: string
): SubmissionID {
  return `submission-${userId}-${collectionId}`;
}

export interface Submission {
  type: typeof type;
  id: SubmissionID;
  createdAt: string;
  updatedAt: string;
  name: string;
  comment: string;
  imageId?: ImageID;
}

export async function getSubmission(
  userId: string,
  collectionId: string
): Promise<Submission | undefined> {
  const result = await client.send(
    new GetItemCommand({
      TableName,
      Key: {
        id: {
          S: createSubmissionID(userId, collectionId),
        },
      },
    })
  );
  return result.Item && (unmarshall(result.Item) as Submission);
}

export async function createSubmission(
  input: InputSource<Submission>
): Promise<Submission> {
  const submission = withCreatedUpdatedAt({
    ...input,
    type,
  });
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall(submission),
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
  return submission;
}

export async function updateSubmission(input: {
  id: SubmissionID;
  name: string;
  comment: string;
  file?: string;
}): Promise<Submission> {
  const result = await client.send(
    new UpdateItemCommand({
      TableName,
      Key: { id: { S: input.id } },
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
  userId: UserID;
  collectionId: CollectionID;
}) {
  await client
    .send(
      new DeleteItemCommand({
        TableName,
        Key: { id: { S: createSubmissionID(userId, collectionId) } },
      })
    )
    .catch(() => {
      /*NOP*/
    });
}
