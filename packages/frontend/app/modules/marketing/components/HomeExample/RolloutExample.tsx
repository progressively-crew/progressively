import { useState } from "react";
import { Browser } from "~/components/Browser";
import { Label } from "~/components/Fields/Label";
import { SliderInput } from "~/components/Fields/SliderInput";
import { Spacer } from "~/components/Spacer";
import { Switch } from "~/components/Switch";
import { styled } from "~/stitches.config";

const BrowserGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "$spacing$8",
  "@mobile": {
    gridTemplateColumns: "1fr",
    gap: "$spacing$4",
  },
});

const FeatureBox = styled("div", {
  background: "$nemesisLight",
  padding: "$spacing$12",
  borderRadius: "$borderRadius$regular",
});

const InnerBrowserWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  width: "150px",
  transition: "all 0.2s",
  background: "$apollo",
  margin: "$spacing$4",
  border: "4px solid transparent",

  "@mobile": {
    width: "unset",
  },

  variants: {
    activated: {
      true: {
        background: "$hermes",
      },
    },
  },
});

interface InnerBrowserProps {
  activatedAt: number;
  rolloutPercentage: number;
  isFlagActive: boolean;
}

const InnerBrowser = ({
  activatedAt,
  isFlagActive,
  rolloutPercentage,
}: InnerBrowserProps) => {
  const isActivated = isFlagActive && rolloutPercentage >= activatedAt;

  return (
    <InnerBrowserWrapper activated={isActivated}>
      {isActivated ? "New page" : "Old page"}
    </InnerBrowserWrapper>
  );
};

const ActionWrapper = styled("div", {
  display: "flex",
  gap: "$spacing$12",
  justifyContent: "space-between",

  "@mobile": {
    flexDirection: "column",
  },
});

export const RolloutExample = () => {
  const [slider, setSlider] = useState(50);
  const [isActivated, setIsActivated] = useState(true);

  return (
    <div>
      <FeatureBox>
        <ActionWrapper>
          <div>
            <Label as="p">Show the new homepage (example)</Label>
            <Switch
              checked={isActivated}
              label="Show new homepage"
              onClick={() => {
                setIsActivated((s) => !s);
              }}
            />
          </div>

          <SliderInput
            name="slider"
            label={`Percentage of users (${slider}%)`}
            percentageValue={slider}
            onChange={setSlider}
          />
        </ActionWrapper>

        <Spacer size={8} />

        <BrowserGrid>
          <Browser>
            <InnerBrowser
              rolloutPercentage={slider}
              isFlagActive={isActivated}
              activatedAt={25}
            />
          </Browser>
          <Browser>
            <InnerBrowser
              rolloutPercentage={slider}
              isFlagActive={isActivated}
              activatedAt={50}
            />
          </Browser>
          <Browser>
            <InnerBrowser
              rolloutPercentage={slider}
              isFlagActive={isActivated}
              activatedAt={75}
            />
          </Browser>
          <Browser>
            <InnerBrowser
              rolloutPercentage={slider}
              isFlagActive={isActivated}
              activatedAt={100}
            />
          </Browser>
        </BrowserGrid>
      </FeatureBox>
    </div>
  );
};
