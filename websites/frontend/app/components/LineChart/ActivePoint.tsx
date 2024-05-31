import type { CustomLayerProps, SliceTooltipProps } from '@nivo/line';
import { DotsItem } from '@nivo/core';

export interface ActivePointProps extends CustomLayerProps {
  currentSlice: SliceTooltipProps['slice'];
}

export const ActivePoint = ({ currentSlice, ...props }: ActivePointProps) => {
  return (
    <g>
      {currentSlice?.points.map(point => (
        <DotsItem
          key={point.id}
          x={point.x}
          y={point.y}
          datum={point.data}
          color={point.color}
          borderColor="white"
          labelYOffset={props.pointLabelYOffset}
          size={10}
          borderWidth={2}
        />
      ))}
    </g>
  );
};
