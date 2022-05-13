import { useEffect, useState } from "react";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const HomeFlaggedComponent = () => {
  const { flags, isLoading } = useFlags();

  if (isLoading) return null;

  if (flags.newHomepage) {
    return <div style={{ background: "red", color: "white" }}>New variant</div>;
  }

  return <div style={{ background: "lightblue" }}>Old variant</div>;
};

const FooterFlaggedComponent = () => {
  const { flags, isLoading } = useFlags();

  if (isLoading) return null;

  if (flags.newFooter) {
    return (
      <div style={{ background: "red", color: "white" }}>
        New footer variant
      </div>
    );
  }

  return <div style={{ background: "lightblue" }}>Old footer variant</div>;
};

const Home = ({ id }) => {
  return (
    <ProgressivelyProvider clientKey="valid-sdk-key" fields={{ id }}>
      <main>
        <p>User {id}</p>
        <HomeFlaggedComponent />
        <FooterFlaggedComponent />
      </main>
    </ProgressivelyProvider>
  );
};
function App() {
  const [id, setId] = useState();

  useEffect(() => {
    const params = new URL(document.location.href).searchParams;
    setId(params.get("id"));
  }, []);

  if (!id) return null;

  return <Home id={id} />;
}

export default App;
