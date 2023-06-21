import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { notifyAt } from "../helpers/notifyAt";

export const TwitterFeed = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      notifyAt("The Tweeter feed feature is currently loading...");
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      document
        .querySelector(".twitter-timeline")
        ?.parentNode?.appendChild(script);

      script.onload = () => {
        notifyAt("The Tweeter feed feature has finished loading.");
        setLoaded(true);
      };
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      notifyAt("");
    };
  }, []);

  return (
    <div className="w-[300px] fixed right-2 bottom-2">
      {!loaded && (
        <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-1 rounded-lg">
          <div className="px-6 py-4 text-center rounded-md bg-white font-bold text-sm flex flex-row gap-2 items-center">
            <div>
              <Spinner className="text-xl" />
            </div>
            <span>Loading the new feature...</span>
          </div>
        </div>
      )}
      <a
        className="twitter-timeline sr-only"
        href="https://twitter.com/_progressively?ref_src=twsrc%5Etfw"
      >
        New feature activated!
      </a>
    </div>
  );
};
