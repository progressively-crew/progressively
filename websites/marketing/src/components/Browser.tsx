import type { ReactNode } from "react";

export interface BrowserProps {
  bg?: "grey" | "default";
  size?: "S" | "M";
  children: React.ReactNode;
  className?: string;
  heading?: ReactNode;
}

export const Browser = ({
  bg,
  children,
  className: cl = "",
  size = "M",
  heading,
}: BrowserProps) => {
  const className = `shadow-xl border border-gray-200 rounded-2xl overflow-hidden shadow-xl ${
    bg === "grey" ? "bg-gray-50" : "bg-white"
  }`;

  const browserBar = size === "S" ? "gap-2 py-2 px-2" : "gap-4 py-4 px-4";
  const dots = size === "S" ? "h-2 w-2" : "h-4 w-4";

  return (
    <div className={`${className} ${cl}`}>
      <div className="flex flex-rox gap-2 items-center text-xs text-gray-500 bg-white border-b border-gray-100">
        <div className={`flex flex-row ${browserBar}`}>
          <div className={`bg-red-500 rounded-full ${dots}`} />
          <div className={`bg-yellow-500 rounded-full ${dots}`} />
          <div className={`bg-green-500 rounded-full ${dots}`} />
        </div>
        {heading}
      </div>
      {children}
    </div>
  );
};
