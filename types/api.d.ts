import type { Submission } from "@/models/Submission";

namespace API {
  export interface PostSubmissionRequestBody {
    collectionId: string;
    token: string;
    name: string;
    comment: string;
  }
  export interface PostSubmissionResponseBody {
    submission: Submission;
  }
}
