import { BsArrowRight } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { Button } from "~/components/Button";
import { SearchBar, Window } from "~/components/Window";
import dark from "./dark.png";

export const CreateFlag = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2">
          <VscTools />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-xl">Create a feature flag</h3>

      <p className="pt-1 md:pt-2 text-gray-700">
        Progressively is built to be usable on any types of application. From
        frontend, to backend, to CLIs. Anything that can send an HTTP request
        can use Progressively. And it supports{" "}
        <strong>Server Side Rendering without flickering</strong>.
      </p>

      <div>
        <div className="pt-4 inline-block">
          <Button
            variant="secondary"
            to="/docs/guides/react"
            icon={
              <BsArrowRight
                aria-hidden
                className="transition-all group-hover:translate-x-1/4"
              />
            }
          >
            SDKs available
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CreateFlagImg = () => {
  return (
    <div className="drop-shadow-2xl">
      <Window inverse header={<SearchBar dark>index.js</SearchBar>}>
        <img src={dark} alt="Progressively dashboard" />
      </Window>
    </div>
  );
};
