import "../style/index.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { Layout } from "../layouts";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Qin Todo</title>
        <meta name="description" content="Qin Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
