import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getSSRProps } from "@progressively/react/lib/ssr";

const Experiment = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>New homepage experiment</h1>
      </div>

      <p>newHomepageExperiment: {flags.newHomepageExperiment}</p>
    </main>
  );
};

const ControlVariantPage: NextPage = ({ progressivelyProps }: any) => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Experiment />
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
  const { ssrProps, cookies } = await getSSRProps("valid-sdk-key", {
    fields: {
      email: "marvin.frachet@something.com",
      id: "1",
    },
    websocketUrl: "ws://localhost:4000",
    apiUrl: "ws://localhost:4000",
  });

  res.setHeader("set-cookie", cookies);

  return {
    props: {
      progressivelyProps: ssrProps,
    },
  };
}

export default ControlVariantPage;
