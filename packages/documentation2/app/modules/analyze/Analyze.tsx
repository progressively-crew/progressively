import { SearchBar, Window } from "~/components/Window";
import analyzeImg from "./analyze.png";

export const Analyze = () => {
  return (
    <section>
      <h2 className="text-center text-3xl md:text-6xl font-semibold mb-12">
        Analyze
      </h2>

      <div className="drop-shadow-xl">
        <Window header={<SearchBar>progressively.app</SearchBar>}>
          <div className="md:h-[600px] overflow-hidden">
            <img
              height="607px"
              src={analyzeImg}
              alt="An example of the insights pane in the dashboard of Progressively"
            />
          </div>
        </Window>
      </div>
    </section>
  );
};
