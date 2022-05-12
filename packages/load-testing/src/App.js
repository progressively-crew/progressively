import { useEffect, useState } from "react";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags, isLoading } = useFlags();

  if (isLoading) return null;

  if (flags.newHomepage) {
    return <div style={{ background: "red", color: "white" }}>New variant</div>;
  }

  return <div style={{ background: "lightblue" }}>Old variant</div>;
};

const Home = ({ id }) => {
  return (
    <ProgressivelyProvider clientKey="valid-sdk-key">
      <main>
        <p>User {id}</p>
        <FlaggedComponent />
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
