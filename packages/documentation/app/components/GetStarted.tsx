import { Highlighter } from "./Highlighter";
import { CliBar, EditorBar, Window } from "./Window";

export const GetStarted = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 md:p-20">
      <h2 className="text-center text-5xl font-bold">
        <span className="text-pink-700">Ready</span> to get started?
      </h2>
      <Window header={<EditorBar>index.js</EditorBar>}></Window>
      <Window header={<CliBar>{"~/jane"}</CliBar>} inverse />
      <Window header={<EditorBar>index.js</EditorBar>}>
        <Highlighter
          content={`
  import { useFlags } from "@progressively/react";

  const Hero = () => {
    const { flags } = useFlags();
    
    if (flags.newHero) {
      return <NewHero />;
    }

    return <OldHero />;
  };
          `}
          language="typescript"
        />
      </Window>
    </section>
  );
};
