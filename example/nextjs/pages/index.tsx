import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getProgressivelyData } from "@progressively/server-side";

const FlaggedComponent = () => {
  const { flags, track } = useFlags();

  return (
    <main>
      <div>
        <h1>New homepage</h1>
        {flags.newHomepage ? "New variant" : "Old variant"}
      </div>

      <button onClick={() => track("A metric", { hello: "world" })}>
        Click me
      </button>

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
  const { data, response } = await getProgressivelyData("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      email: "marvin.frachet@something.com",
      id: "1",
    },
  });

  const progressivelyCookie = response.headers.get("set-cookie");
  res.setHeader("set-cookie", progressivelyCookie);

  return {
    props: {
      progressivelyProps: data,
    },
  };
}

export default Home;
