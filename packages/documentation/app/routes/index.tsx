import { useEffect } from "react";
import { Logo } from "~/components/Logo";
import Prism from "prismjs";

export default function Index() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <main>
      <div className="hero">
        <section className="grid section">
          <div className="start-block">
            <div className="logo">
              <Logo />
            </div>
            <h1>Rollout quickly, effectively, Progressively.</h1>
            <p className="catchphrase">
              The feature flag solution that does not kill your application
              performances, that has an accessible dashboard, self-hosted and
              that propagates in real-time.
            </p>

            <code className="inline">
              <span className="highlight">$</span> npm install{" "}
              <span className="highlight">@progressively/react</span>
            </code>

            <div>
              <a
                className="get-started"
                href="https://github.com/progressively-crew/progressively#get-started"
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="block">
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
        </section>
      </div>

      <section className="section">
        <div className="features">
          <div className="feature">
            <h2>Lightweight SDKs</h2>
            <p>
              The client side{" "}
              <a
                href="https://bundlephobia.com/package/@progressively/sdk-js"
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                JavaScript SDK is less than 1kB
              </a>
              . The{" "}
              <a
                href="https://bundlephobia.com/package/@progressively/react"
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                React SDK is less than 1.1kB
              </a>
              . You can also check{" "}
              <a
                href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs"
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                this real Nextjs application
              </a>{" "}
              using competitors SDKs with audits.
            </p>
          </div>

          <div className="feature">
            <h2>Self-hosted</h2>
            <p>
              <a
                href="https://github.com/progressively-crew/progressively"
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                Progressively is an open source feature flag product
              </a>{" "}
              that you can host on your own servers. You own your data and your
              infrastructure.
            </p>
          </div>

          <div className="feature">
            <h2>Accessible</h2>
            <p>
              We are trying our best to make the dashboard accessible. If you
              face any trouble,{" "}
              <a
                href="https://github.com/progressively-crew/progressively/issues/new?assignees=&labels=&template=bug_report.md&title="
                target="_blank"
                rel="noopener noreferer noreferrer"
              >
                make sure to open an issue
              </a>{" "}
              so that we can keep track of it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
