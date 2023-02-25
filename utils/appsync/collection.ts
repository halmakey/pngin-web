import {
  GetCollectionQuery,
  ListCollectionsQuery,
} from "@/API";
import { listCollections } from "@/graphql/queries";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { configureAmplifyOnce } from "../configure-amplify";
import * as queries from "@/graphql/queries";
import { Collection } from "@/types/api/collection";

configureAmplifyOnce();

export async function listAllCollections(): Promise<Collection[]> {
  const result = await API.graphql<GraphQLQuery<ListCollectionsQuery>>({
    query: listCollections,
  });
  return (
    result.data?.listCollections?.items.map((c) => {
      if (!c) {
        throw new Error("Unexpected collection");
      }
      return c;
    }) ?? []
  );
}

export async function getCollection(id: string): Promise<Collection | null> {
  const result = await API.graphql<GraphQLQuery<GetCollectionQuery>>({
    query: queries.getCollection,
    variables: { id },
  });
  return result.data?.getCollection ?? null;
}
