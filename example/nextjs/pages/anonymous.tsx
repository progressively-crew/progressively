import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ProgressivelyProvider, useFlags } from "@progressively/react";
import { getProgressivelyInitialData } from "@progressively/react/lib/ssr";

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
  const userIdFromNextjsCookie =
    (req as any).cookies?.["progressively-id"] || null;

  const { initialData, response } = await getProgressivelyInitialData(
    "valid-sdk-key",
    {
      websocketUrl: "ws://localhost:4000",
      apiUrl: "http://localhost:4000",
      fields: {
        id: userIdFromNextjsCookie,
      },
    }
  );

  const progressivelyCookie = response.headers.get("set-cookie");
  res.setHeader("set-cookie", progressivelyCookie);

  return {
    props: {
      progressivelyProps: initialData,
    },
  };
}

export default Home;
