import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Highlighter } from "./Highlighter";
import { CliBar, EditorBar, Window } from "./Window";
import { VscTools } from "react-icons/vsc";
import { TbServer2 } from "react-icons/tb";

const CliExample = () => {
  return (
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
  );
};

const ReactExample = () => {
  return (
    <Window inverse header={<EditorBar>index.js</EditorBar>}>
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
  );
};

export const GetStarted = () => {
  return (
    <div>
      <section className="max-w-screen-xl mx-auto px-4 py-12 md:p-20">
        <h2 className="text-center text-3xl md:text-5xl font-bold">
          <span className="text-indigo-700">Ready</span> to get started?
        </h2>

        <div className="pt-12 flex flex-col gap-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <TbServer2 className="text-4xl text-indigo-700" aria-hidden />

              <h3 className="text-xl font-bold pt-2 md:text-3xl">
                Create your own instance
              </h3>

              <p className="md:text-xl pt-1 md:pt-6 text-gray-700">
                Progressively is a self-hosted feature flagging tool. With the
                following commands, you will create a running instance of
                Progressively that you can interact with. Host it on your
                server, own your data.
              </p>

              <div className="pt-4">
                <NavLink
                  className="text-xl rounded px-4 h-12 -ml-4 text-indigo-700 font-semibold inline-flex flex-row items-center gap-2 hover:bg-gray-200 active:bg-gray-300 transition-all group"
                  to="/docs/introduction/getting-started"
                >
                  Get Started{" "}
                  <BsArrowRight
                    aria-hidden
                    className="transition-all group-hover:translate-x-1/4"
                  />
                </NavLink>
              </div>
            </div>

            <div className="hidden flex items-center lg:block">
              <CliExample />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <VscTools className="text-4xl text-indigo-700" />
              <h3 className="text-xl font-bold pt-2 md:text-3xl">
                Choose a SDK
              </h3>

              <p className="md:text-xl pt-1 md:pt-6 text-gray-700">
                Progressively is built to be usable on any types of application.
                From frontend, to backend, to CLIs. Anything that can send an
                HTTP request can use Progressively. And it supports{" "}
                <strong>Server Side Rendering without flickering</strong>.
              </p>

              <div className="pt-4">
                <NavLink
                  className="text-xl rounded px-4 h-12 -ml-4 text-indigo-700 font-semibold inline-flex flex-row items-center gap-2 hover:bg-gray-200 active:bg-gray-300 transition-all group"
                  to="/docs/guides/react"
                >
                  SDKs available{" "}
                  <BsArrowRight
                    aria-hidden
                    className="transition-all group-hover:translate-x-1/4"
                  />
                </NavLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <ReactExample />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
