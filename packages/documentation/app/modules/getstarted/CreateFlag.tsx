import { TbFlag3 } from "react-icons/tb";
import { SearchBar, Window } from "~/components/Window";
import light from "./light.png";

export const CreateFlag = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="bg-gray-100 border border-gray-200 text-3xl text-gray-500 rounded-lg inline-block p-2">
          <TbFlag3 />
        </div>
      </div>

      <h3 className="font-bold pt-2 text-3xl">Create a feature flag</h3>

      <p className="pt-1 md:pt-4 text-gray-600 text-xl">
        Start the dashboard, follow the instructions and create your first
        feature flag. It will be available for usage with SDKs.
      </p>
    </div>
  );
};

export const CreateFlagImg = () => {
  return (
    <div className="drop-shadow-xl">
      <Window header={<SearchBar>{"/"}</SearchBar>}>
        <div className="h-[254px] w-[528px] overflow-x-auto">
          <img src={light} alt="Progressively dashboard" height={"254px"} />
        </div>
      </Window>
    </div>
  );
};
