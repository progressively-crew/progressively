import { useEffect, useState } from "react";
import { asyncWithLDProvider, useFlags } from "launchdarkly-react-client-sdk";

const FlaggedComponent = () => {
  const flags = useFlags();

  if (flags.newHomepage) return <p>New homepage</p>;
  return <p>Old homepage</p>;
};

export default function Ld() {
  const [Root, setRoot] = useState(null);

  useEffect(() => {
    const loadLd = async () => {
      const LDProvider = await asyncWithLDProvider({
        clientSideID: "your-client-side-id",
      });

      setRoot(LDProvider);
    };

    loadLd();
  }, []);

  if (!Root) return <p>Loading LaunchDarkly</p>;

  return (
    <Root>
      <FlaggedComponent />
    </Root>
  );
}
