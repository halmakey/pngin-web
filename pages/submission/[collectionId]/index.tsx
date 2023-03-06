import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import { getCollection, isCollectionId } from "@/models/Collection";
import { getSubmission, Submission } from "@/models/Submission";
import { verifyUserToken } from "@/utils/token";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Collection } from "@/types/model";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import { BorderButton, FillButton } from "@/components/buttons";
import { SubmissionCredit } from "@/components/submission/SubmissionCredit";
import AuthContext from "@/contexts/auth-context";
import Script from "next/script";
import { postSubmission } from "@/utils/api-client";

interface Props {
  collection: Collection;
  submission: Submission | null;
}

export default function Page({ collection, submission }: Props) {
  const { user } = useContext(AuthContext);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameRef.current) {
      return;
    }

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );
      postSubmission({
        collectionId: collection.id,
        token,
        name: nameRef.current?.value || '',
        comment: ''
      })
    });
  }, [collection.id]);

  const [creditImage, setCreditImage] = useState<ArrayBuffer>();

  const [isOpenSubmission, setOpenSubmission] = useState(!!submission);
  const openSubmission = useCallback(() => setOpenSubmission(true), []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      <Head>
        <title>{`${collection.name} | ${SITE_TITLE}`}</title>
      </Head>
      <Header />
      <Main>
        <h1 className="my-4 text-xl">{collection.name}</h1>
        {!isOpenSubmission && (
          <BorderButton onClick={openSubmission}>応募する</BorderButton>
        )}
        {isOpenSubmission && (
          <form
            onSubmit={handleSubmit}
            className="my-4 flex flex-col items-center gap-2 border border-gray-400 p-4"
          >
            <label htmlFor="name">出展者名: </label>
            <input
              ref={nameRef}
              className="border border-gray-500 p-1 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="投稿者名を入力する"
              defaultValue={submission?.name || user?.name}
              required
            />
            <label htmlFor="credit">クレジット画像: </label>
            <SubmissionCredit onChange={setCreditImage} />
            ※あとから変更可能です
            <FillButton type="submit" disabled={!creditImage}>
              {submission ? "更新" : "出展登録"}
            </FillButton>
            <span className="text-center text-xs">
              This site is protected by reCAPTCHA and the Google
              <br />
              <a href="https://policies.google.com/privacy">
                Privacy Policy
              </a>{" "}
              and
              <a href="https://policies.google.com/terms">
                Terms of Service
              </a>{" "}
              apply.
            </span>
          </form>
        )}
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

  const submission = (await getSubmission(userId, collectionId)) ?? null;

  return {
    props: {
      collection,
      submission,
    },
  };
};
