import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import { getCollection } from "@/models/Collection";
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
import * as API from "@/utils/api-client";
import { ReCaptchaCredit } from "@/components/ReCaptchaCredit";
import { validateNanoID, validateString } from "@/utils/validate";

interface Props {
  collection: Collection;
  submission: Submission | null;
}

export default function Page({ collection, submission }: Props) {
  const collectionId = collection.id;
  const { user } = useContext(AuthContext);
  const [currentSubmission, setCurrentSubmission] = useState(submission);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nameRef.current) {
        return;
      }

      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );
      const { submission } = await API.postSubmission({
        collectionId,
        token,
        name: nameRef.current?.value || "",
        comment: "",
      });
      setCurrentSubmission(submission);
    },
    [collectionId]
  );

  const [creditImage, setCreditImage] = useState<ArrayBuffer>();

  const [isOpenSubmission, setOpenSubmission] = useState(!!submission);
  const openSubmission = useCallback(() => setOpenSubmission(true), []);
  const cancelSubmission = useCallback(async () => {
    if (currentSubmission) {
      if (!confirm("出展を取り消します。よろしいですか？")) {
        return;
      }

      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "delete" }
      );
      await API.deleteSubmission({
        collectionId,
        token,
      });
      setCurrentSubmission(null);
      setOpenSubmission(false);
      return;
    }
    grecaptcha.ready(async () => {});
    setOpenSubmission(false);
  }, [collectionId, currentSubmission]);

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
            ※あとから変更できます
            <div className="flex flex-row gap-2">
              <BorderButton onClick={cancelSubmission}>
                {currentSubmission ? "削除" : "キャンセル"}
              </BorderButton>
              <FillButton type="submit" disabled={!creditImage}>
                {currentSubmission ? "更新" : "出展登録"}
              </FillButton>
            </div>
          </form>
        )}
        <div className="flex-1 flex flex-col justify-end">
          <ReCaptchaCredit />
        </div>
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
  const collectionId = validateNanoID(params?.collectionId);

  if (!collectionId) {
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
