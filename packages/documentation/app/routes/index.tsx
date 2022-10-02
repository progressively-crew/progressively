import { useEffect } from "react";
import { Logo } from "~/components/Logo";
import Prism from "prismjs";

export default function Index() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <main className="background hero">
      <div className="grid section">
        <div>
          <div className="logo">
            <Logo />
          </div>
          <h1>Rollout quickly, effectively, Progressively.</h1>
          <p className="catchphrase">
            The feature flag solution that does not kill your application
            performances, that has an accessible dashboard, self-hosted and that
            propagates in real-time.
          </p>

          <code className="inline">$ npm install @progressively/react</code>

          <div>
            <a className="get-started" href="">
              Get started
            </a>
          </div>
        </div>
        <div className="end-block">
          <code className="language-js">{`import {
  ProgressivelyProvider,
  useFlags
} from "@progressively/react";
          
const HomePage = () => {
  const { flags } = useFlags();
  
  if (flags.newHomepage) {
    return <NewHomePage />;
  }

  return <OldHomePage />;
};

const App = () => {
  return (
    <ProgressivelyProvider
      clientKey="YOUR_ENVIRONMENT_CLIENT_KEY"
      apiUrl="YOUR_API_URL"
      websocketUrl="YOUR WEBSOCKET SERVER"
    >
      <HomePage />
    </ProgressivelyProvider>
  );
};`}</code>
        </div>
      </div>
    </main>
  );
}
