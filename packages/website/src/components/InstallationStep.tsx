import { Card } from "./Card";

export const InstallationStep = () => {
  const numberClass =
    "w-10 h-10 flex items-center justify-center bg-fuchsia-900 text-white rounded-lg text-xl mb-4";

  const titleClass = "font-bold text-xl";
  const pClass = "text-slate-700";

  const btnClass =
    "px-6 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const secondaryBtnClass =
    "bg-transparent border border-slate-200 hover:bg-slate-100";

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      <section className={"py-20 md:py-40"}>
        <h2 className="font-extrabold text-3xl md:text-7xl pb-4">
          Not so hard to get there.
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed pb-12">
          Embark on your Progressively journey effortlessly! Just follow these
          simple steps
          <br /> to create your first feature flag and enjoy 1000 free events!
          Success awaits!
        </p>

        <ol className="grid grid-cols-3 gap-4">
          <li>
            <Card>
              <div>
                <div className={numberClass}>1</div>
                <h3 className={titleClass}>Create an account</h3>
                <p className={pClass}>
                  Create your account, your first project and your first feature
                  flag..
                </p>
              </div>
            </Card>
          </li>
          <li>
            <Card>
              <div>
                <div className={numberClass}>2</div>
                <h3 className={titleClass}>Choose a SDK</h3>
                <p className={pClass}>
                  Check the SDK page, choose one and add it to your codebase.
                </p>
              </div>
            </Card>
          </li>

          <li>
            <Card>
              <div>
                <div className={numberClass}>3</div>
                <h3 className={titleClass}>Evaluate your flag</h3>
                <p className={pClass}>
                  Make a conditional statement in your code base and play with
                  the dashboard.
                </p>
              </div>
            </Card>
          </li>
        </ol>
      </section>
    </div>
  );
};
