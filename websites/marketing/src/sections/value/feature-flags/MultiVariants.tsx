import { useState } from "react";
import { Radio } from "../../../components/Radio";
import {
  AVariant,
  BVariant,
  BannerBrowser,
  SingleVariant,
} from "./BannerBrowser";

export const MultiVariants = () => {
  const [selected, setSelected] = useState<"single" | "multi">("single");

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-4 w-full">
        <BannerBrowser
          banner={selected === "single" ? <SingleVariant /> : <AVariant />}
        />
        <BannerBrowser
          banner={selected === "single" ? <SingleVariant /> : <BVariant />}
        />
      </div>

      <div className="flex flex-row gap-4 items-center h-10">
        <div>
          <label className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Radio
              checked={selected === "single"}
              onChange={() => setSelected("single")}
            />
            Single variant
          </label>
        </div>

        <div>
          <label className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Radio
              checked={selected === "multi"}
              onChange={() => setSelected("multi")}
            />
            Multi variants
          </label>
        </div>
      </div>
    </div>
  );
};
