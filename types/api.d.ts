import type { Author } from "@/models/Author";
import type { Image } from "@/models/Image";

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
    signedUrl: string;
    image: Image;
  }
  export interface DeleteImageRequestBody {
    imageId: string;
  }
}
