export interface EvalCardProps {
  count: number;
}

export const EvalCard = ({ count }: EvalCardProps) => {
  return (
    <div
      className="border border-gray-100 rounded-md dark:border-slate-700 p-4 flex flex-col items-center justify-center bg-gradient-to-t from-indigo-600 to-pink-400"
      style={{ height: 300 }}
    >
      <div className="text-6xl text-slate-100 font-bold">{count}</div>
      <p className="text-lg text-slate-100 text-xl">evaluations</p>
    </div>
  );
};
