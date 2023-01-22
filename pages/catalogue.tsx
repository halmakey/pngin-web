import { BorderButton } from "@/components/buttons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Catalogue</title>
      </Head>
      <Header />
      <Main>
        <BorderButton>Button</BorderButton>
      </Main>
      <Footer />
    </>
  );
}
