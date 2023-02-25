import {
  CreateUserInput,
  CreateUserMutation,
  GetUserQuery,
  ListUsersByDiscordIdQuery,
  ListUsersQuery,
  UpdateUserInput,
  UpdateUserMutation,
} from "@/API";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import { API, GraphQLQuery } from "@aws-amplify/api";

export async function findUserByDiscordId(discordId: string) {
  const result = await API.graphql<GraphQLQuery<ListUsersByDiscordIdQuery>>({
    query: queries.listUsersByDiscordId,
    variables: {
      discordId: {
        eq: discordId,
      },
      sortDirection: "ASC",
    },
  });
  const items = result.data?.listUsersByDiscordId?.items;
  if (items?.length ?? 0 >= 2) {
    throw new Error("Unexpected number of users with discordId: " + discordId);
  }
  return items?.[0];
}

export async function getUser(id: string) {
  const result = await API.graphql<GraphQLQuery<GetUserQuery>>({
    query: queries.getUser,
    variables: { id },
  });
  return result.data?.getUser;
}

export async function updateUser(input: UpdateUserInput) {
  const result = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
    query: mutations.updateUser,
    variables: {
      input,
    },
  });
  if (!result.data?.updateUser) {
    throw new Error("Unexpected user: " + input.discordId);
  }
  return result.data.updateUser;
}
