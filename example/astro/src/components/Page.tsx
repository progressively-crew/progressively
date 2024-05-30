import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>Astro</h1>
        <h2>New homepage</h2>
        {flags.newHomepage ? "New variant" : "Old variant"}
      </div>

      <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer>
    </main>
  );
};

const Page = ({ progressivelyProps }: any) => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};

export default Page;
