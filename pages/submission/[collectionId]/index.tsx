import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import { getCollection } from "@/models/Collection";
import * as Author from "@/models/Author";
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
  author: Author.Author | null;
}

export default function Page({ collection, author }: Props) {
  const collectionId = collection.id;
  const { user } = useContext(AuthContext);
  const [currentAuthor, setCurrentAuthor] = useState(author);

  const nameRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<Blob>();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nameRef.current || !uploadedImage) {
        return;
      }

      const image = await API.postImage({
        token: await grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: "postimage" }
        ),
      });

      await API.postSignedUrl(image.post, uploadedImage);
      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const { author } = await API.putAuthor({
        collectionId,
        token: await grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: "submit" }
        ),
        name: nameRef.current?.value || "",
        comment: "",
        imageId: image.image.id,
      });
      setCurrentAuthor(author);
    },
    [collectionId, uploadedImage]
  );

  const [isOpenSubmission, setOpenSubmission] = useState(!!author);
  const openSubmission = useCallback(() => setOpenSubmission(true), []);
  const cancelSubmission = useCallback(async () => {
    if (currentAuthor) {
      if (!confirm("??????????????????????????????????????????????????????")) {
        return;
      }

      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "delete" }
      );
      await API.deleteAuthor({
        collectionId,
        token,
      });
      setCurrentAuthor(null);
      setOpenSubmission(false);
      return;
    }
    grecaptcha.ready(async () => {});
    setOpenSubmission(false);
  }, [collectionId, currentAuthor]);

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
          <BorderButton onClick={openSubmission}>????????????</BorderButton>
        )}
        {isOpenSubmission && (
          <form
            onSubmit={handleSubmit}
            className="my-4 flex flex-col items-center gap-2 border border-gray-400 p-4"
          >
            <label htmlFor="name">????????????: </label>
            <input
              ref={nameRef}
              className="border border-gray-500 p-1 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="???????????????????????????"
              defaultValue={author?.name || user?.name}
              required
            />
            <label htmlFor="credit">?????????????????????: </label>
            <SubmissionCredit onChange={setUploadedImage} />
            ?????????????????????????????????
            <div className="flex flex-row gap-2">
              <BorderButton onClick={cancelSubmission}>
                {currentAuthor ? "??????" : "???????????????"}
              </BorderButton>
              <FillButton type="submit" disabled={!uploadedImage}>
                {currentAuthor ? "??????" : "????????????"}
              </FillButton>
            </div>
          </form>
        )}
        <div className="flex flex-1 flex-col justify-end">
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

  const author = (await Author.getAuthor(collectionId, userId)) ?? null;

  return {
    props: {
      collection,
      author,
    },
  };
};
