import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Spacer } from "../Spacer";

export interface SuccessBoxProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const TipBox = ({ children, title, ...props }: SuccessBoxProps) => {
  return (
    <div
      className="success-box p-4 bg-blue-50 text-blue-600 rounded border-l-8 border-l-blue-500"
      {...props}
    >
      <div className="flex flex-row gap-2">
        <MdOutlineTipsAndUpdates aria-hidden className="mt-1" />

        <div>
          {title}

          <Spacer size={2} />

          {children}
        </div>
      </div>
    </div>
  );
};
