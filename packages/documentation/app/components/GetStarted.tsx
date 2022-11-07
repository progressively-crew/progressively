import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Highlighter } from "./Highlighter";
import { CliBar, EditorBar, Window } from "./Window";
import { HiOutlineServerStack } from "react-icons/hi2";
import { VscTools } from "react-icons/vsc";

const CliExample = () => {
  return (
    <Window header={<CliBar>{"~/jane"}</CliBar>}>
      <Highlighter
        content={`
  $ git clone https://github.com/progressively-crew/progressively
  $ cd progressively
  $ mv ./packages/backend/.env.example ./packages/backend/.env
  $ mv ./packages/frontend/.env.example ./packages/frontend/.env
  $ docker-compose up -d
    `}
        language="shell"
      />
    </Window>
  );
};

const ReactExample = () => {
  return (
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
  );
};

export const GetStarted = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 md:p-20">
      <h2 className="text-center text-5xl font-bold">
        <span className="text-pink-700">Ready</span> to get started?
      </h2>

      <div className="pt-12 flex flex-col gap-12">
        <div className="grid grid-cols-2 gap-12">
          <CliExample />

          <div className="flex flex-col justify-center">
            <HiOutlineServerStack className="text-4xl text-pink-700" />

            <h3 className="text-3xl font-bold pt-1">
              Create your own instance
            </h3>
            <p className="text-xl pt-6 text-gray-700">
              Progressively is a self-hosted feature flagging tool. With the
              following commands, you will create a running instance of
              Progressively that you can interact with. Host it on your server,
              own your data.
            </p>

            <NavLink
              className="text-xl text-pink-700 font-semibold pt-6 flex flex-row items-center gap-2"
              to="/docs/introduction/getting-started"
            >
              Get started <BsArrowRight aria-hidden />
            </NavLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <ReactExample />

          <div className="flex flex-col justify-center">
            <VscTools className="text-4xl text-pink-700" />
            <h3 className="text-3xl font-bold pt-1">Choose a SDK</h3>
            <p className="text-xl pt-6 text-gray-700">
              Progressively is built to be usable on any types of application.
              From frontend, to backend, to CLIs. Anything that can send an HTTP
              request can use Progressively. And it supports{" "}
              <strong>Server Side Rendering without flickering</strong>.
            </p>

            <NavLink
              className="text-xl text-pink-700 font-semibold pt-6 flex flex-row items-center gap-2"
              to="/docs/guides/react"
            >
              SDK available <BsArrowRight aria-hidden />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
