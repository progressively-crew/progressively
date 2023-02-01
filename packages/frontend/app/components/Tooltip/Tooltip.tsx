import * as RTooltip from "@radix-ui/react-tooltip";

export interface TooltipProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;
}

export const Tooltip = ({ children, tooltip }: TooltipProps) => {
  return (
    <RTooltip.Provider>
      <RTooltip.Root>
        <RTooltip.Trigger asChild>
          <button className="IconButton">efefe</button>
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content className="TooltipContent" sideOffset={5}>
            Add to library
            <RTooltip.Arrow className="TooltipArrow" />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
};
