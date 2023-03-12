import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  HeadObjectCommandInput,
  HeadObjectCommandOutput,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";

interface S3AppClient {
  generateSignedPostUrl(
    objectName: string,
    contentType: string,
    maxContentLength: number
  ): Promise<PresignedPost>;
  listObjects(): Promise<ListObjectsV2CommandOutput>;
  headObject(objectName: string): Promise<HeadObjectCommandOutput | null>;
  deleteObject(objectName: string): Promise<DeleteObjectCommandOutput>;
}

export function createS3AppClient({
  region,
  accessKeyId,
  secretAccessKey,
  bucketName,
}: {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}): S3AppClient {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return {
    async generateSignedPostUrl(
      objectName: string,
      contentType: string,
      maxContentLength: number
    ) {
      const result = await createPresignedPost(client, {
        Bucket: bucketName,
        Key: objectName,
        Conditions: [["content-length-range", 0, maxContentLength]],
        Fields: {
          "Content-Type": contentType,
        },
      });
      return result;
    },
    async listObjects() {
      const result = await client.send<
        ListObjectsV2CommandInput,
        ListObjectsV2CommandOutput
      >(
        new ListObjectsV2Command({
          Bucket: bucketName,
        })
      );
      return result;
    },
    async headObject(
      objectName: string
    ): Promise<HeadObjectCommandOutput | null> {
      try {
        return await client.send<
          HeadObjectCommandInput,
          HeadObjectCommandOutput
        >(
          new HeadObjectCommand({
            Bucket: bucketName,
            Key: objectName,
          })
        );
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "name" in err &&
          err?.name === "403"
        ) {
          return null;
        }
        throw err;
      }
    },
    async deleteObject(objectName: string) {
      return await client.send<
        DeleteObjectCommandInput,
        DeleteObjectCommandOutput
      >(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: objectName,
        })
      );
    },
  };
}
