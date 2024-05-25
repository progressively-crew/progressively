import { Browser } from "./Browser";
import ffSrc from "../sections/assets/abovefold/ff.png";
import { useEffect, useState } from "react";
import { useScroll } from "../hooks/useScroll";

export const AnimatedImage = () => {
  const [rotateX, setRotateX] = useState(-60);

  useEffect(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 400) {
      const scrollFraction = scrollPosition / 400;
      const rotateXValue = -60 + 60 * scrollFraction;
      setRotateX(rotateXValue);
    } else {
      setRotateX(0);
    }
  }, []);

  useScroll((scrollPosition) => {
    if (scrollPosition < 400) {
      const scrollFraction = scrollPosition / 400;
      const rotateXValue = -60 + 60 * scrollFraction;
      setRotateX(rotateXValue);
    }
  });

  return (
    <div className="origin-top relative" style={{ perspective: 2000 }}>
      <div
        style={{ transform: `rotateX(${rotateX}deg)` }}
        className="border-8 border-black rounded-3xl"
      >
        <Browser>
          <div className="p-2">
            <img src={ffSrc.src} alt="Feature flags of progressively.app" />
          </div>
        </Browser>
      </div>
    </div>
  );
};
