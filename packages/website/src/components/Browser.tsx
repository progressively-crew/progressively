export interface BrowserProps {
  children: React.ReactNode;
}

export const Browser = ({ children }: BrowserProps) => {
  return (
    <div className="w-full">
      <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
        <span className="w-3 h-3 rounded-full bg-red-400"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-400"></span>
      </div>
      <div className="bg-gray-50 border-t-0 w-full relative">{children}</div>
    </div>
  );
};

export const BrowserVersion = ({ isToggled }: { isToggled: boolean }) => {
  return (
    <Browser>
      <div className={`flex flex-row p-4`}>
        <div
          className={`h-16 ${
            isToggled ? "w-16 mr-4" : "w-0 mr-0"
          } rounded-lg bg-gray-300 shrink-0 transition-all`}
        ></div>

        <div className={`flex flex-col gap-1 h-full transition-all w-full`}>
          <div
            className={`font-extrabold rounded-full w-full h-3 bg-gray-300 transition-all`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300 transition-all`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300 transition-all`}
          ></div>

          {isToggled && (
            <div
              className="flex flex-row gap-1 animate-opacity-appearing opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <div
                className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-900`}
              ></div>
              <div
                className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-200`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </Browser>
  );
};

export const OldVersion = () => {
  return (
    <Browser>
      <div className={`flex flex-col gap-1 h-full transition-all p-4 pb-9`}>
        <div
          className={`font-extrabold rounded-full w-full h-3 bg-gray-300`}
        ></div>
        <div
          className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300`}
        ></div>
        <div
          className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300`}
        ></div>
      </div>
    </Browser>
  );
};

export const NewVersion = () => {
  return (
    <Browser>
      <div className="flex flex-row gap-4 p-4">
        <div className="h-16 w-16 rounded-lg bg-gray-300"></div>

        <div className={`flex flex-col gap-1 h-full transition-all flex-1`}>
          <div
            className={`font-extrabold rounded-full w-full h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300`}
          ></div>

          <div className="flex flex-row gap-1">
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-900`}
            ></div>
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-200`}
            ></div>
          </div>
        </div>
      </div>
    </Browser>
  );
};

export const AVersion = () => {
  return (
    <Browser>
      <div className="flex flex-row gap-4 p-4">
        <div className={`flex flex-col gap-1 h-full transition-all flex-1`}>
          <div
            className={`font-extrabold rounded-full w-full h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300`}
          ></div>

          <div className="flex flex-row gap-1">
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-900`}
            ></div>
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-200`}
            ></div>
          </div>
        </div>

        <div className="h-16 w-16 rounded-lg bg-gray-300"></div>
      </div>
    </Browser>
  );
};

export const BVersion = () => {
  return (
    <Browser>
      <div className="flex flex-row gap-4 p-4">
        <div className="h-16 w-16 rounded-lg bg-gray-300"></div>

        <div className={`flex flex-col gap-1 h-full transition-all flex-1`}>
          <div
            className={`font-extrabold rounded-full w-full h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300`}
          ></div>

          <div className="flex flex-row gap-1">
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-900`}
            ></div>
            <div
              className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-200`}
            ></div>
          </div>
        </div>
      </div>
    </Browser>
  );
};

export const CVersion = () => {
  return (
    <Browser>
      <div className="flex flex-col gap-4 p-4 items-center">
        <div
          className={`flex flex-col gap-1 h-full transition-all w-full items-center`}
        >
          <div
            className={`font-extrabold rounded-full w-full h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[66%] h-3 bg-gray-300`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[33%] h-3 bg-gray-300`}
          ></div>
        </div>

        <div className="flex flex-row gap-1 w-full justify-center">
          <div
            className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-900`}
          ></div>
          <div
            className={`font-extrabold rounded-full w-[20%] h-3 bg-fuchsia-200`}
          ></div>
        </div>
      </div>
    </Browser>
  );
};
