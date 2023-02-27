import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import { getCollection, isCollectionId } from "@/models/collection";
import { verifyUserToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Collection } from "@/types/model";
import { parseBody } from "next/dist/server/api-utils/node";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useMemo, useRef } from "react";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { FillButton } from "@/components/buttons";

interface Props {
  collection: Collection;
  // submission?: Submission;
}

export default function Page({ collection }: Props) {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const creditRef = useRef<HTMLInputElement>(null);
  const { setFile: setCreditFile, result: creditImage } = useImageProcessor({
    width: 700,
    height: 400,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ e });
    if (!nameRef.current || !creditRef.current) {
      return;
    }
    if (creditRef.current.files?.length !== 1) {
      return;
    }
  };

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length !== 1) {
        return;
      }
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      setCreditFile(file);
    },
    [setCreditFile]
  );

  const creditImageSrc = useMemo(
    () => creditImage && URL.createObjectURL(new Blob([creditImage])),
    [creditImage]
  );

  return (
    <>
      <Head>
        <title>{`${collection.name} | ${SITE_TITLE}`}</title>
      </Head>
      <Header />
      <Main>
        <h1>{collection.name} 作品投稿フォーム</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-2"
        >
          <label htmlFor="name">投稿者名: </label>
          <input
            ref={nameRef}
            className="border border-gray-500 p-1 outline-none"
            type="text"
            id="name"
            name="name"
            defaultValue="テスト"
            required
          />
          <label htmlFor="credit">クレジット画像: </label>
          <input
            ref={creditRef}
            className="border border-gray-500 p-1"
            type="file"
            id="credit"
            name="credit"
            accept="image/png,image/jpeg,image/gif"
            onChange={handleChangeImage}
          />
          {creditImage && (
            <img width="350" height="200" src={creditImageSrc} alt="Credit" />
          )}
          <FillButton type="submit">作品投稿</FillButton>
        </form>
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
