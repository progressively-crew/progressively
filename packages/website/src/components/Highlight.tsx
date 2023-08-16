export interface HighlightProps {
  children: React.ReactNode;
}

export const Highlight = ({ children }: HighlightProps) => {
  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
      {children}
    </span>
  );
};
