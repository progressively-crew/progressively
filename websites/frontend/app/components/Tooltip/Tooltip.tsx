import {
  Tooltip as RawTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./RawTooltip";

export interface TooltipProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;
}

export const Tooltip = ({ children, tooltip }: TooltipProps) => {
  return (
    <TooltipProvider>
      <RawTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </RawTooltip>
    </TooltipProvider>
  );
};
