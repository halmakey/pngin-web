import Header from "@/components/Header";
import Main from "@/components/Main";
import { SubmissionEntryCard } from "@/components/thatched/submission/SubmissionEntryCard";
import { SITE_TITLE } from "@/constants/values";
import { Collection } from "@/types/api/collection";
import { getCollection } from "@/utils/appsync/collection";
import { verifyUserToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  collection: Collection;
  // submission?: Submission;
}

export default function Page({ collection }: Props) {
  return (
    <>
      <Head>
        <title>{`${collection.name} | ${SITE_TITLE}`}</title>
      </Head>
      <Header />
      <Main>
        <h1>{collection.name} 作品投稿フォーム</h1>
        <SubmissionEntryCard collection={collection} />
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
}) => {
  const token = req.cookies.token;
  const payload = token && (await verifyUserToken(token));
  const userId = payload && payload.user.id;

  const collectionId = String(params?.collectionId);
  const collection = await getCollection(collectionId);

  return collection
    ? {
        props: {
          collection,
        },
      }
    : {
        notFound: true,
      };
};
