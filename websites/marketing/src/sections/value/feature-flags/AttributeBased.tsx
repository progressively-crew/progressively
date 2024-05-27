import { useState } from "react";
import {
  AVariant,
  BVariant,
  BannerBrowser,
  EmptyBanner,
} from "./BannerBrowser";
import { Radio } from "../../../components/Radio";

export const AttributeBased = () => {
  const [selected, setSelected] = useState<"gmail" | "icloud" | "both" | "off">(
    "off"
  );

  const isGoogle = ["gmail"].includes(selected);
  const isApple = ["icloud"].includes(selected);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-4 shrink-0 w-full">
        <BannerBrowser
          heading="@gmail.com"
          banner={
            isGoogle || selected === "both" ? <AVariant /> : <EmptyBanner />
          }
        />
        <BannerBrowser
          heading="@icloud.com"
          banner={
            isApple || selected === "both" ? <BVariant /> : <EmptyBanner />
          }
        />
      </div>

      <div className="flex flex-row gap-4 items-center h-10">
        <div>
          <label className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Radio checked={isGoogle} onChange={() => setSelected("gmail")} />
            Gmail addresses
          </label>
        </div>

        <div>
          <label className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Radio checked={isApple} onChange={() => setSelected("icloud")} />
            ICloud addresses
          </label>
        </div>

        <div>
          <label className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Radio
              checked={selected === "both"}
              onChange={() => setSelected("both")}
            />
            Both
          </label>
        </div>
      </div>
    </div>
  );
};
