import { NavLink } from "@remix-run/react";
import { Logo } from "./Logo";
import imageSrc from "./images/page.png";
import { SearchBar, Window } from "./Window";

export const Hero = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center md:p-8">
            <Logo />
          </div>

          <h1 className="text-white text-3xl font-extrabold sm:text-5xl p-1">
            Rollout quickly, effectively,
            <span className="sm:block text-pink-400"> Progressively. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            A simple, accessible, lightweight, self-hosted and OpenSource{" "}
            <strong>feature flagging tool</strong>.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavLink
              className="block w-full rounded bg-indigo-700 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600 active:bg-indigo-800 sm:w-auto"
              to="/docs/introduction/why"
            >
              Get Started
            </NavLink>

            <NavLink
              className="block w-full rounded px-12 py-3 text-sm bg-gray-800 font-medium text-white hover:bg-gray-600 active:bg-gray-700 sm:w-auto"
              to="/docs/introduction/demo-instance"
            >
              Live demo
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroVariant = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-2xl px-16 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="flex flex-col gap-20 lg:flex-row lg:gap-12 items-center">
          <div className="lg:flex-[2]">
            <div className="py-8">
              <Logo />
            </div>

            <h1 className="text-white text-3xl font-extrabold sm:text-4xl p-1">
              Rollout quickly, effectively,
              <span className="sm:block text-pink-400"> Progressively. </span>
            </h1>

            <p className="mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
              A simple, accessible, lightweight, self-hosted and OpenSource{" "}
              <strong>feature flagging tool</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink
                className="block w-full rounded bg-indigo-700 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600 active:bg-indigo-800 sm:w-auto"
                to="/docs/introduction/why"
              >
                Get Started
              </NavLink>

              <NavLink
                className="block w-full rounded px-12 py-3 text-sm bg-gray-800 font-medium text-white hover:bg-gray-600 active:bg-gray-700 sm:w-auto"
                to="/docs/introduction/demo-instance"
              >
                Live demo
              </NavLink>
            </div>
          </div>

          <div className="text-black lg:flex-[3] relative">
            <div className="h-full w-full absolute rounded-md -top-8 -right-8 bg-gradient-to-r from-gray-900 via-indigo-700 via-purple-700 to-pink-500"></div>
            <Window header={<SearchBar>https://progressively.app</SearchBar>}>
              <img
                src={imageSrc}
                alt="Activation of the newHero flag for 50% of the audience in the dashboard of Progressively"
              />
            </Window>
          </div>
        </div>
      </div>
    </div>
  );
};
