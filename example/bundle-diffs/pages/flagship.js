import { FlagshipProvider, useFsModifications } from "@flagship.io/react-sdk";

const FlaggedComponent = () => {
  const fsModifications = useFsModifications([
    {
      key: "backgroundColor",
      defaultValue: "green",
      activate: true,
    },
  ]);
  return (
    <div
      style={{
        height: "200px",
        width: "200px",
        backgroundColor: fsModifications.backgroundColor,
      }}
    >
      {"I'm a square with color=" + fsModifications.backgroundColor}
    </div>
  );
};

function Unleash() {
  return (
    <FlagshipProvider
      envId="YOUR_ENV_ID"
      apiKey="YOUR_API_KEY" // <= Required in next major release
      enableConsoleLogs={true}
    >
      <FlaggedComponent />
    </FlagshipProvider>
  );
}

export default Unleash;
