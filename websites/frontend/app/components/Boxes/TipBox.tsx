import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Spacer } from "../Spacer";

export interface SuccessBoxProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const TipBox = ({ children, title, ...props }: SuccessBoxProps) => {
  return (
    <div
      className="success-box p-4 bg-blue-100 text-blue-700 rounded-xl border-l-8 border-l-blue-500"
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
