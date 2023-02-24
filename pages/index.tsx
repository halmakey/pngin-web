import { ListCollectionsQuery } from "@/API";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import { listCollections } from "@/graphql/queries";
import { GraphQLQuery } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetStaticProps } from "next";
import Head from "next/head";

interface CollectionProps {
  id: string;
  name: string;
}

interface Props {
  activeCollections: CollectionProps[];
}

export default function Page({ activeCollections }: Props) {
  console.log(activeCollections)
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <Main>
        {activeCollections.map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
