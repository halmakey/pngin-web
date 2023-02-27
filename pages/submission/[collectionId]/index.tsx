import Header from "@/components/Header";
import Main from "@/components/Main";
import { SubmissionEntryCard } from "@/components/thatched/submission/SubmissionEntryCard";
import { SITE_TITLE } from "@/constants/values";
import { getCollection, isCollectionId } from "@/models/collection";
import { verifyUserToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Collection } from "@/types/model";
import { parseBody } from "next/dist/server/api-utils/node";

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

  if (!userId) {
    return {
      redirect: {
        permanent: false,
        destination: `/api/auth/signin?callback=${encodeURIComponent(
          `/submission/${collectionId}`
        )}`,
      },
    };
  }

  if (req.method === "POST") {
    console.log({ req });
    const result = await parseBody(req, "1mb");
    console.log({ credit: result.credit });
  }

  return {
    props: {
      collection,
    },
  };
};
