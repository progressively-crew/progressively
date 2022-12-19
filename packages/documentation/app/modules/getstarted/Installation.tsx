import { BsArrowRight } from "react-icons/bs";
import { TbServer2 } from "react-icons/tb";
import { Button } from "~/components/Button";
import { Highlighter } from "~/components/Highlighter";
import { CliBar, Window } from "~/components/Window";

export const Installation = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700">
          <TbServer2 />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-xl dark:text-slate-100">
        Create your own instance
      </h3>

      <p className="pt-1 md:pt-2 text-gray-700 dark:text-slate-200">
        Progressively is a self-hosted feature flagging tool. With the following
        commands, you will create a running instance of Progressively that you
        can interact with. Host it on your server, own your data.
      </p>

      <div>
        <div className="pt-4 inline-block">
          <Button
            variant="secondary"
            to="/docs/introduction/getting-started"
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
        <Highlighter
          content={`
	$ git clone https://github.com/progressively-crew/progressively
	$ cd progressively
	$ docker-compose up -d
		`}
          language="shell"
        />
      </Window>
    </div>
  );
};
