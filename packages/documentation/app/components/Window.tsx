import React from "react";

export interface WindowProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  inverse?: boolean;
}

export interface BarProps {
  children?: React.ReactNode;
}

export const CliBar = ({ children }: BarProps) => {
  return <div className="flex-1 text-center text-sm">{children}</div>;
};

export const EditorBar = ({ children }: BarProps) => {
  return (
    <div className="flex-1 text-sm h-full ml-16">
      <div className="border-l border-r border-t border-gray-100 border-t-pink-500 h-full inline-flex items-center px-4">
        {children}
      </div>
    </div>
  );
};

export const SearchBar = ({ children }: BarProps) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="text-xs bg-gray-100 rounded-md px-10 py-1">
        {children}
      </div>
    </div>
  );
};

export const Window = ({ children, header, inverse }: WindowProps) => {
  const additionalTopBarStyles = inverse
    ? "border-b-gray-800"
    : "border-b-gray-100";

  const wrapperStyle = inverse ? "bg-gray-900" : "bg-white";
  const textInverse = inverse
    ? "text-white flex-1 flex items-center h-full"
    : "flex-1 flex items-center h-full";

  return (
    <div
      className={
        "rounded-md relative drop-shadow-xl overflow-hidden " + wrapperStyle
      }
    >
      <div
        className={
          "flex flex-row items-center h-12 px-4 gap-4 relative border-b  " +
          additionalTopBarStyles
        }
      >
        <div className="flex flex-row gap-2 absolute">
          <div className="bg-red-500 w-3 h-3 rounded-full" />
          <div className="bg-yellow-500 w-3 h-3 rounded-full" />
          <div className="bg-green-500 w-3 h-3 rounded-full" />
        </div>

        {header && <div className={textInverse}>{header}</div>}
      </div>

      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};
