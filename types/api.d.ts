import type { Author } from "@/models/Author";

namespace API {
  export type NoBody = Record<never, never>;
  export interface PostAuthorRequestBody {
    collectionId: string;
    token: string;
    name: string;
    comment: string;
  }
  export interface PostAuthorResponseBody {
    author: Author;
  }
  export interface DeleteAuthorRequestBody {
    collectionId: string;
    token: string;
  }
}
