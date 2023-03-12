import type { Author } from "@/models/Author";
import type { Image } from "@/models/Image";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";

namespace API {
  export type NoBody = Record<never, never>;
  export interface PutAuthorRequestBody {
    collectionId: string;
    token: string;
    name: string;
    comment: string;
    imageId: string;
  }
  export interface PutAuthorResponseBody {
    author: Author;
  }
  export interface DeleteAuthorRequestBody {
    collectionId: string;
    token: string;
  }
  export interface PostImageRequestBody {
    token: string;
  }
  export interface PostImageResponseBody {
    post: PresignedPost;
    image: Image;
  }
  export interface DeleteImageRequestBody {
    imageId: string;
  }
}
