import { Collection, ListCollectionsQuery } from "@/API";
import Header from "@/components/Header";
import Main from "@/components/Main";
import CollectionCard from "@/components/thatched/CollectionCard";
import { SITE_TITLE } from "@/constants/values";
import { listCollections } from "@/graphql/queries";
import { configureAmplifyOnce } from "@/utils/configure-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetStaticProps } from "next";
import Head from "next/head";
interface Props {
  activeCollections: Collection[]
}

export default function Page({ activeCollections }: Props) {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <Main>
        {activeCollections.map((c) => (
          <CollectionCard key={c.id} collection={c}/>
        ))}
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await configureAmplifyOnce()
  const result = await API.graphql<GraphQLQuery<ListCollectionsQuery>>({
    query: listCollections,
  });

  return {
    props: {
      activeCollections: result.data?.listCollections?.items ?? [],
    },
    revalidate: 2,
  };
};
