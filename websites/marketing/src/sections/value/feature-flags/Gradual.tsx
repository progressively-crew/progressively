import { useState } from "react";
import { BannerBrowser, EmptyBanner, SingleVariant } from "./BannerBrowser";
import { PercentageField } from "../../../components/PercentageField";

export const Gradual = () => {
  const [percentage, setPercentage] = useState(0);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-4 shrink-0 w-full">
        <BannerBrowser
          banner={percentage >= 50 ? <SingleVariant /> : <EmptyBanner />}
        />
        <BannerBrowser
          banner={percentage === 100 ? <SingleVariant /> : <EmptyBanner />}
        />
      </div>

      <div className="w-[200px] relative">
        <PercentageField
          value={percentage}
          label={"Change percentage"}
          onChange={setPercentage}
        />
      </div>
    </div>
  );
};
