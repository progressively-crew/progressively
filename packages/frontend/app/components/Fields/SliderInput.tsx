import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Stack } from "../Stack";
import { VisuallyHidden } from "../VisuallyHidden";
import { Label } from "./Label";

export interface SliderInputProps {
  percentageValue: number;
  name: string;
  label: string;
  onChange: (nextValue: number) => void;
  hiddenLabel?: boolean;
  id?: string;
}

const ThumbSize = 1.6;
const TrackSize = 0.5;

const RangeInput = styled("input", {
  "-webkit-appearance": "none",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  height: `$cta`,
  minWidth: "16rem",

  // chrome edge safari
  "&::-webkit-slider-runnable-track": {
    background: "$nemesisLight",
    height: `${TrackSize}rem`,
    borderRadius: "$borderRadius$regular",
  },

  "&::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    appearance: "none",
    marginTop: `-${(ThumbSize - TrackSize) / 2}rem`,
    borderRadius: "50%",
    backgroundColor: "$apollo",
    height: `${ThumbSize}rem`,
    width: `${ThumbSize}rem`,
    boxSizing: "border-box",
    transition: "all .2s",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",

    "&:active": {
      transform: "scale(1.4)",
    },
  },

  // firefox
  "&::-moz-range-track": {
    marginTop: `-${(ThumbSize - TrackSize) / 2}rem`,
    background: "$nemesisLight",
    height: `${TrackSize}rem`,
    borderRadius: "$borderRadius$regular",
  },

  "&::-moz-range-thumb": {
    borderRadius: "50%",
    padding: "2px",
    border: "1px solid $apollo",
    backgroundColor: "$apollo",
    height: `${ThumbSize}rem`,
    width: `${ThumbSize}rem`,
    boxSizing: "border-box",
    transition: "all .2s",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",

    "&:active": {
      transform: "scale(1.4)",
    },
  },
});

const ThumbnailValue = styled("div", {
  fontFamily: "$default",
  background: "$nemesis",
  color: "$apollo",
  padding: "$spacing$2",
  borderRadius: "$borderRadius$regular",
  width: "$spacing$12",
  textAlign: "center",
});

const Triangle = styled("div", {
  width: 0,
  height: 0,
  borderTop: "6px solid transparent",
  borderBottom: "6px solid transparent",
  borderRight: "6px solid $nemesis",
});

export const SliderInput = ({
  percentageValue,
  name,
  id,
  label,
  hiddenLabel,
  onChange,
}: SliderInputProps) => {
  const currentId = id || name;

  return (
    <Stack spacing={2}>
      {hiddenLabel ? (
        <VisuallyHidden>
          <label htmlFor={currentId}>{label}</label>
        </VisuallyHidden>
      ) : (
        <Label htmlFor={currentId}>{label}</Label>
      )}

      <HStack spacing={2}>
        <RangeInput
          autoComplete="off"
          type="range"
          min={0}
          max={100}
          step={1}
          value={percentageValue}
          id={currentId}
          name={name}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        <HStack aria-hidden>
          <Triangle />
          <ThumbnailValue>{percentageValue}%</ThumbnailValue>
        </HStack>
      </HStack>
    </Stack>
  );
};
