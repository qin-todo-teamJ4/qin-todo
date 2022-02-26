import "../style/index.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import type { VFC } from "react";
import { RecoilRoot } from "recoil";
import { Loader } from "src/components/auth/Loader";
import { useAuth } from "src/lib/auth";

import { Layout } from "../layouts";

const Auth: VFC<{ children: JSX.Element }> = (props) => {
  const isLoading = useAuth();
  return isLoading ? <Loader /> : props.children;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Qin Todo</title>
        <meta name="description" content="Qin Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
