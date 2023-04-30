import { BsArrowRight } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { Button } from "~/components/Button";
import { Highlighter } from "~/components/Highlighter";
import { EditorBar, Window } from "~/components/Window";

export const ChooseSdk = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2">
          <VscTools />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-3xl">Choose a SDK</h3>

      <p className="pt-1 md:pt-4 text-gray-600 text-xl">
        Progressively is built to be usable on any types of application. From
        frontend, to backend, to CLIs. Anything that can send an HTTP request
        can use Progressively. And it supports{" "}
        <strong>Server Side Rendering without flickering</strong>.
      </p>

      <div>
        <div className="pt-5 inline-block">
          <Button
            variant="secondary"
            href="https://progressively.gitbook.io/docs/developpers/sdks"
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

export const ChooseSdkCode = () => {
  return (
    <div className="drop-shadow-xl">
      <Window inverse header={<EditorBar>index.js</EditorBar>}>
        <div className="h-[312px] w-[528px] overflow-x-auto">
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
        </div>
      </Window>
    </div>
  );
};
