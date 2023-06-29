import sprinkle from "../images/Sprinkle.svg";

export interface EasyToUseProps {
  provider: string;
  clientComponent: string;
}

export const EasyToUse = ({ provider, clientComponent }: EasyToUseProps) => {
  const codeClass =
    "bg-slate-800 p-4 rounded-lg border border-slate-700 text-xs h-full overflow-scroll";

  return (
    <section
      className="bg-slate-900 py-20 md:py-40"
      style={{
        backgroundImage: `url("${sprinkle}")`,
      }}
    >
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-4xl md:text-5xl pb-4 md:text-center text-white">
          With just a few lines of code
        </h2>

        <p className="text-2xl leading-relaxed md:text-center text-white pb-8">
          Check the following example using the React SDK with real-time
          updates.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            dangerouslySetInnerHTML={{ __html: provider }}
            className={`${codeClass}`}
          />

          <div
            dangerouslySetInnerHTML={{ __html: clientComponent }}
            className={`${codeClass}`}
          />
        </div>
      </div>
    </section>
  );
};
