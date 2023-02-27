import Header from "@/components/Header";
import Main from "@/components/Main";
import CollectionCard from "@/components/thatched/CollectionCard";
import { SITE_TITLE } from "@/constants/values";
import { Collection } from "@/types/model";
import { listAllCollection } from "@/models/collection";
import { GetStaticProps } from "next";
import Head from "next/head";
interface Props {
  collection: Collection[];
}

export default function Page({ collection }: Props) {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <Main>
        <div className="flex flex-col gap-4">
        {collection.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
        </div>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      collection: await listAllCollection(),
    },
    revalidate: 2,
  };
};
