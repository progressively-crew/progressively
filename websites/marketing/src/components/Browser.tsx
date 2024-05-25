export interface BrowserProps {
  bg?: "grey" | "default";
  children: React.ReactNode;
  className?: string;
}

export const Browser = ({ bg, children, className: cl = "" }: BrowserProps) => {
  const className = `shadow-xl border border-gray-200 rounded-2xl overflow-hidden shadow-xl ${
    bg === "grey" ? "bg-gray-50" : "bg-white"
  }`;

  return <div className={`${className} ${cl}`}>{children}</div>;
};
