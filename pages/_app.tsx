import { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "@/contexts/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="PNG Museum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
