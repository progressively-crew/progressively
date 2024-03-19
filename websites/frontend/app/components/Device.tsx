import { Typography } from "./Typography";

export interface DeviceProps {
  width: number;
}
export const Device = ({ width }: DeviceProps) => {
  return (
    <div className="">
      <div className="bg-black w-16 h-24 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gray-800 w-full h-full p-1">
          <div className="h-full bg-white rounded-lg flex items-center justify-center">
            <Typography className="text-xs">
              Width
              <br />
              {width}px
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
