export interface BrowserProps {
  bg?: "grey" | "default";
  children: React.ReactNode;
}

export const Browser = ({ bg, children }: BrowserProps) => {
  const className = `flex flex-row justify-between gap-8 border border-slate-200 rounded-2xl overflow-hidden shadow-xl ${
    bg === "grey" ? "bg-slate-50" : "bg-white"
  }`;

  return <div className={className}>{children}</div>;
};
