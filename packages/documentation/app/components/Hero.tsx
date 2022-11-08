import { NavLink } from "@remix-run/react";
import { Logo } from "./Logo";

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
