import { useState } from "react";
import { Browser } from "~/components/Browser";
import { SliderInput } from "~/components/Fields/SliderInput";
import { HStack } from "~/components/HStack";
import { Switch } from "~/components/Switch";
import { styled } from "~/stitches.config";

const BrowserGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "$spacing$8",
});

const InnerBrowser = styled("div", {
  height: "200px",
  width: "150px",
  transition: "all 0.2s",

  variants: {
    activated: {
      true: {
        background: "$hermes",
      },
    },
  },
});

export const RolloutExample = () => {
  const [slider, setSlider] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div>
      <HStack spacing={4}>
        <Switch
          checked={isActivated}
          label="Show new homepage"
          onClick={() => {
            setIsActivated((s) => !s);
          }}
        />

        <SliderInput
          name="slider"
          label="Percentage of users"
          percentageValue={slider}
          onChange={setSlider}
        />
      </HStack>

      <BrowserGrid>
        <Browser>
          <InnerBrowser activated={isActivated && slider >= 25} />
        </Browser>
        <Browser>
          <InnerBrowser activated={isActivated && slider >= 50} />
        </Browser>
        <Browser>
          <InnerBrowser activated={isActivated && slider >= 75} />
        </Browser>
        <Browser>
          <InnerBrowser activated={isActivated && slider >= 100} />
        </Browser>
      </BrowserGrid>
    </div>
  );
};
