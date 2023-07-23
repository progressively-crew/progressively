import { AVersion, BVersion, CVersion } from "./Browser";

export const ABTesting = ({ code }: { code: string }) => {
  const codeClass = `leading-relaxed h-full block text-[11px] overflow-x-scroll md:overflow-hidden bg-slate-800 text-slate-100 border-slate-700`;
  const preClass = `overflow-hidden md:overflow-visible px-4 rounded-lg border bg-slate-800 text-slate-100 border-slate-700`;

  const variantTextClass = "text-center font-bold text-xl pt-4";

  return (
    <div className="bg-white">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-4xl md:text-7xl pb-4">
            Multi-variants
            <br /> and A/B testing
          </h2>

          <p className="text-2xl leading-relaxed pb-4">
            Correlate errors raised in your tracking tool with your feature
            rollout. When a feature generates too many errors,{" "}
            <strong>you can deactivate it in one click</strong>.
          </p>

          <div className="grid grid-cols-[2fr_1fr] gap-4 items-center">
            <div className="grid md:grid-cols-3 gap-4 pb-4">
              <div>
                <AVersion />
                <p className={variantTextClass}>Version A</p>
              </div>
              <div>
                <BVersion />
                <p className={variantTextClass}>Version B</p>
              </div>
              <div>
                <CVersion />
                <p className={variantTextClass}>Version C</p>
              </div>
            </div>

            <pre className={preClass}>
              <code
                dangerouslySetInnerHTML={{ __html: code }}
                className={`${codeClass}`}
              />
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};
