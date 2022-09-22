import { useState } from "react";
import { Browser } from "~/components/Browser";
import { SliderInput } from "~/components/Fields/SliderInput";
import { HStack } from "~/components/HStack";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { styled } from "~/components/stitches.config";

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
  flexDirection: "column",
  justifyContent: "left",
  textAlign: "left",
});

export const RolloutExample = () => {
  const [slider, setSlider] = useState(50);
  const [isActivated, setIsActivated] = useState(true);

  return (
    <div>
      <HStack spacing={8} direction={{ "@tablet": "column" }}>
        <ActionWrapper>
          <div>
            <Typography>Show the login homepage</Typography>
            <Switch
              checked={isActivated}
              label="Show login homepage"
              onClick={() => {
                setIsActivated((s) => !s);
              }}
            />
          </div>

          <SliderInput
            name="slider"
            label="Percentage of users"
            percentageValue={slider}
            onChange={setSlider}
          />
        </ActionWrapper>

        <FeatureBox>
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
      </HStack>
    </div>
  );
};
