import { VscTools } from "react-icons/vsc";
import { SearchBar, Window } from "~/components/Window";
import dark from "./dark.png";
import light from "./light.png";

export const CreateFlag = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700">
          <VscTools />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-xl dark:text-slate-100">
        Create a feature flag
      </h3>

      <p className="pt-1 md:pt-2 text-gray-700 dark:text-slate-200">
        Start the dashboard, follow the instructions and create your first
        feature flag. It will be available for usage with SDKs.
      </p>
    </div>
  );
};

export const CreateFlagImg = () => {
  return (
    <div className="drop-shadow-xl">
      <Window inverse header={<SearchBar dark>{"/"}</SearchBar>}>
        <img src={dark} alt="Progressively dashboard" className="dark:hidden" />
        <img
          src={light}
          alt="Progressively dashboard"
          className="hidden dark:block"
        />
      </Window>
    </div>
  );
};
