import { useTheme } from "~/modules/theme/useTheme";
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
  bgColor?: string;
  fgColor?: string;
}

export const SliderInput = ({
  percentageValue,
  name,
  id,
  label,
  hiddenLabel,
  onChange,
  bgColor,
  fgColor,
}: SliderInputProps) => {
  const { theme } = useTheme();
  const currentId = id || name;

  const wrapperStyle = bgColor
    ? ({ "--input-range-track": bgColor } as React.CSSProperties)
    : undefined;

  const inputStyles = {
    "--input-range-bg": theme === "dark" ? "#64748b" : "#e5e7eb",
  };

  return (
    <div style={wrapperStyle}>
      <Stack spacing={2}>
        {hiddenLabel ? (
          <VisuallyHidden>
            <label htmlFor={currentId}>{label}</label>
          </VisuallyHidden>
        ) : (
          <Label htmlFor={currentId}>{label}</Label>
        )}

        <HStack spacing={2}>
          <input
            autoComplete="off"
            type="range"
            min={0}
            max={100}
            step={1}
            value={percentageValue}
            id={currentId}
            name={name}
            onChange={(e) => onChange(Number(e.target.value))}
            className="appearance h-10 w-52"
            style={inputStyles}
          />

          <HStack aria-hidden>
            <span className="triangle mt-2" />
            <span
              className={`px-2 py-1 rounded w-14 text-center ${
                fgColor ? "" : "text-white bg-indigo-600"
              }`}
              style={{
                color: fgColor,
                background: bgColor,
              }}
            >
              {percentageValue}%
            </span>
          </HStack>
        </HStack>
      </Stack>
    </div>
  );
};
