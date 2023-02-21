export interface TimelineProps {
  children: React.ReactNode;
}
export const Timeline = ({ children }: TimelineProps) => {
  return <ol>{children}</ol>;
};

export interface TimelineStepProps {
  left: React.ReactNode;
  right: React.ReactNode;
  position: string;
}
export const TimelineStep = ({ left, right, position }: TimelineStepProps) => {
  return (
    <li className="px-4 md:px-0 py-8 md:py-20 relative">
      <div className="grid md:grid-cols-[1fr_auto_1fr] md:gap-20 items-center">
        {left && <div className="hidden md:block">{left}</div>}

        <div>
          <div className="hidden md:block h-full absolute bg-transparent w-[1px] top-0 ml-[16px] border-r border-gray-500 border-dashed" />

          <div className="py-4 bg-gray-50 z-10 relative hidden md:block">
            <div className="hidden md:flex rounded-full w-8 h-8 border-2 border-gray-200 bg-white text-sm text-gray-700 items-center justify-center">
              {position}
            </div>
          </div>
        </div>

        <div className="text-center  md:text-left">{right}</div>
      </div>
    </li>
  );
};
