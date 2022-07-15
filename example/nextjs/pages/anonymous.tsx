import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getSSRProps } from "@progressively/react/lib/ssr";

const getProgressivelyProps = async (req: Request, res: any, fields?: any) => {
  const { ssrProps, cookies } = await getSSRProps("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      id: fields?.id || (req as any).cookies?.["progressively-id"] || null,
      ...fields,
    },
  });

  res.setHeader("set-cookie", cookies);

  return ssrProps;
};

const FlaggedComponent = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>New homepage</h1>
        {flags.newHomepage ? "New variant" : "Old variant"}
      </div>

      <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer>
    </main>
  );
};

const Home: NextPage = ({ progressivelyProps }: any) => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <FlaggedComponent />
      </div>
    </ProgressivelyProvider>
  );
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: Request;
  res: any;
}) {
  const ssrProps = await getProgressivelyProps(req, res);

  return {
    props: {
      progressivelyProps: ssrProps,
    },
  };
}

export default Home;
