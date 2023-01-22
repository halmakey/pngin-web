import Header from "@/components/Header";
import Main from "@/components/Main";
import { SITE_TITLE } from "@/constants/values";
import Head from "next/head";

export default function Page() {
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
