import type { Author } from "@/models/Author";

namespace API {
  export type NoBody = Record<never, never>;
  export interface PutAuthorRequestBody {
    collectionId: string;
    token: string;
    name: string;
    comment: string;
  }
  export interface PutAuthorResponseBody {
    author: Author;
  }
  export interface DeleteAuthorRequestBody {
    collectionId: string;
    token: string;
  }
}
