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
    <li className="max-w-screen-xl mx-auto px-4 md:px-0 py-20 relative">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-20 items-center">
        {left}

        <div>
          <div className="h-full absolute bg-transparent w-[1px] top-0 ml-[16px] border-r border-gray-500 border-dashed" />

          <div className="py-4 bg-gray-50 z-10 relative">
            <div className="rounded-full w-8 h-8 border-2 border-indigo-100 bg-white text-sm text-indigo-700 items-center justify-center flex ">
              {position}
            </div>
          </div>
        </div>

        {right}
      </div>
    </li>
  );
};
