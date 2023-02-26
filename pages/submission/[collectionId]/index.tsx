import Header from "@/components/Header";
import Main from "@/components/Main";
import { SubmissionEntryCard } from "@/components/thatched/submission/SubmissionEntryCard";
import { SITE_TITLE } from "@/constants/values";
import { getCollection, isCollectionId } from "@/utils/dynamo/collection";
import { verifyUserToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Collection } from "@/types/model";

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

  const collectionId = params?.collectionId;
  if (!isCollectionId(collectionId)) {
    return {
      notFound: true,
    };
  }
  const collection = await getCollection(collectionId);
  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      collection,
    },
  };
};
