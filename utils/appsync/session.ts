import {
  CreateSessionInput,
  CreateSessionMutation,
  DeleteSessionMutation,
  GetSessionQuery,
  UpdateSessionInput,
  UpdateSessionMutation,
} from "@/API";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { Session } from "@/types/api/session";

export async function getSession(id: string): Promise<Session | null> {
  const result = await API.graphql<GraphQLQuery<GetSessionQuery>>({
    query: queries.getSession,
    variables: {
      id,
    },
  });
  return result.data?.getSession ?? null;
}

export async function createSession(
  input: CreateSessionInput
): Promise<Session> {
  const result = await API.graphql<GraphQLQuery<CreateSessionMutation>>({
    query: mutations.createSession,
    variables: { input },
  });
  if (!result.data?.createSession) {
    throw new Error("Unexpected session data");
  }
  return result.data.createSession;
}

export async function updateSession(
  input: UpdateSessionInput
): Promise<Session> {
  const result = await API.graphql<GraphQLQuery<UpdateSessionMutation>>({
    query: mutations.updateSession,
    variables: { input },
  });
  if (!result.data?.updateSession) {
    throw new Error("Unepected session:" + input.id);
  }
  return result.data.updateSession;
}

export async function deleteSession(id: string): Promise<Session | null> {
  const result = await API.graphql<GraphQLQuery<DeleteSessionMutation>>({
    query: mutations.deleteSession,
    variables: { input: { id } },
  });
  return result.data?.deleteSession ?? null;
}
