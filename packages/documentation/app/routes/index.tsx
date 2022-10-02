import { Logo } from "~/components/Logo";

export default function Index() {
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

          <code>
            <span className="highlight">$</span> npm install
            @progressively/react
          </code>

          <div>
            <a className="get-started" href="">
              Get started
            </a>
          </div>
        </div>
        <div>lol</div>
      </div>
    </main>
  );
}
