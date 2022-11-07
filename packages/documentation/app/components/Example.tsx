import { useState } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import { CliBar, EditorBar, SearchBar, Window } from "./Window";

const BrowserExample = () => {
  const [transition, setTransition] = useState(false);

  const assetStyles = transition
    ? "bg-indigo-700 flex-1"
    : "bg-gray-200 flex-[2_2_0%]";

  const firstLineStyles = transition
    ? " w-1/2 h-4 bg-gray-700 mb-2"
    : " w-1/2 h-2 bg-gray-200";

  const buttonStyle = transition ? "w-6 bg-pink-300" : "w-0 bg-pink-100";

  return (
    <div>
      <button onClick={() => setTransition((s) => !s)}>Go for it</button>
      <Window header={<SearchBar>https://your-app.com</SearchBar>}>
        <div className="p-4">
          <div className={"transition-all flex flex-row gap-2"}>
            <div
              className={
                "rounded-md transition-all h-20 flex justify-center items-center text-3xl text-white " +
                assetStyles
              }
            >
              {transition ? <TbPlayerPlay /> : null}
            </div>

            <div
              className={
                "transition-all flex gap-1 flex-col justify-center flex-[2_2_0%]"
              }
            >
              <div
                className={"transition-all rounded-full " + firstLineStyles}
              />
              <div
                className={"transition-all rounded-full w-full h-2 bg-gray-200"}
              />
              <div
                className={"transition-all rounded-full w-3/4 h-2 bg-gray-200"}
              />

              <div className={"h-2 rounded-full h-2 mt-2 " + buttonStyle} />
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
};

export const Example = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 md:p-20">
      <h2 className="text-center text-5xl font-bold">
        <span className="text-indigo-700">Deploy</span> the way you want it
      </h2>

      <div className="grid grid-cols-3 gap-4 pt-12">
        <BrowserExample />
        <Window header={<CliBar>{"~/jane"}</CliBar>} inverse />
        <Window header={<EditorBar>index.js</EditorBar>}>lol</Window>
      </div>
    </section>
  );
};
