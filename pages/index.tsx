import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import AuthContext from "@/contexts/auth-context";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Page() {
  const { refresh } = useContext(AuthContext);
  const router = useRouter();

  useAsyncEffect(async () => {
    if (router.query.refresh !== "") {
      return;
    }
    await refresh();
    // router.replace("/");
  }, [router.query.refresh]);

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <Main>はろー</Main>
    </>
  );
}
