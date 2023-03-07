import type { Submission } from "@/models/Submission";

namespace API {
  export type NoBody = Record<never, never>;
  export interface PostSubmissionRequestBody {
    collectionId: string;
    token: string;
    name: string;
    comment: string;
  }
  export interface PostSubmissionResponseBody {
    submission: Submission;
  }
  export interface DeleteSubmissionRequestBody {
    collectionId: string;
    token: string;
  }
}
