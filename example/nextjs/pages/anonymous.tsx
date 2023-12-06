import type { NextPage } from "next";
import Head from "next/head";
import { serialize } from "cookie";
import styles from "../styles/Home.module.css";
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { Progressively } from "@progressively/server-side";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>Nextjs</h1>
        <h2>New homepage</h2>
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
  const id = (req as any).cookies?.["progressively-id"] ?? null;

  const sdk = Progressively.init({
    secretKey: "secret-key",
    clientKey: "valid-sdk-key",
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      id,
    },
  });

  const { data, userId } = await sdk.loadFlags();

  const cookie = serialize("progressively-id", userId, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  res.setHeader("set-cookie", cookie);

  return {
    props: {
      progressivelyProps: data,
    },
  };
}

export default Home;
