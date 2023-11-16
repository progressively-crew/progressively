import { MdOutlineTipsAndUpdates } from "react-icons/md/index.js";
import { Spacer } from "../Spacer";

export interface SuccessBoxProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const TipBox = ({ children, title, ...props }: SuccessBoxProps) => {
  return (
    <div
      className="success-box p-4 bg-gray-100 text-gray-700 rounded border-l-8 border-l-gray-500"
      {...props}
    >
      <div className="flex flex-row gap-2">
        <MdOutlineTipsAndUpdates aria-hidden className="-mt-1 h-8 w-8" />

        <div>
          <span className="font-bold">{title}</span>

          <Spacer size={2} />

          {children}
        </div>
      </div>
    </div>
  );
};
