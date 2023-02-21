import { BsArrowRight } from "react-icons/bs";
import { TbServer2 } from "react-icons/tb";
import { Button } from "~/components/Button";
import { Highlighter } from "~/components/Highlighter";
import { CliBar, Window } from "~/components/Window";

export const Installation = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2">
          <TbServer2 />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-3xl">
        Get the project running locally
      </h3>

      <p className="pt-1 md:pt-4 text-gray-600 text-xl">
        Progressively is a self-hosted feature flagging tool. With the following
        commands, you will create a running instance of Progressively that you
        can interact with. Host it on your server, own your data.
      </p>

      <div>
        <div className="pt-5 inline-block">
          <Button
            variant="secondary"
            href="https://progressively.gitbook.io/docs/getting-started/quick-start"
            icon={
              <BsArrowRight
                aria-hidden
                className="transition-all group-hover:translate-x-1/4"
              />
            }
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export const InstallationCli = () => {
  return (
    <div className="drop-shadow-xl">
      <Window inverse header={<CliBar>{"~/jane"}</CliBar>}>
        <div className="h-[120px] w-[528px] overflow-x-auto">
          <Highlighter
            content={`
	$ git clone https://github.com/progressively-crew/progressively
	$ cd progressively
	$ docker-compose up -d
		`}
            language="shell"
          />
        </div>
      </Window>
    </div>
  );
};
