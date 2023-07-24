export interface WatchProps {
  children: React.ReactNode;
}

export const Watch = ({ children }: WatchProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="h-8 bg-slate-800 w-24 -mb-[8px] mr-2"
        style={{
          transform: "perspective(200px) rotateX(60deg)",
        }}
      />

      <div className="flex flex-row">
        <div className="border-[6px] border-[#F4CDA8] rounded-[32px]">
          <div className="border-[12px] border-slate-900 rounded-[24px]">
            <div className="w-32 h-40 flex items-center justify-center bg-slate-800 text-white text-2xl">
              {children}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 pt-10">
          <div className="bg-[#F4CDA8] w-2 h-8 rounded-r"></div>
        </div>
      </div>

      <div
        className="h-8 bg-slate-800 w-24 -mt-[8px] mr-2"
        style={{
          transform: "perspective(200px) rotateX(-60deg)",
        }}
      />
    </div>
  );
};
