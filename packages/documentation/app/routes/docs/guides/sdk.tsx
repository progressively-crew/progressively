import { Link } from "@remix-run/react";
import { useRef } from "react";

interface SdkCardProps {
  title: string;
  href: string;
  description: React.ReactNode;
}

const SdkCard = ({ title, href, description }: SdkCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      tabIndex={-1}
      className="bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 py-8 h-full relative drop-shadow cursor-pointer"
      onClick={() => linkRef?.current?.click()}
    >
      <h2 className="text-base font-semibold mb-0 pb-2">
        <Link
          to={href}
          ref={linkRef}
          className="!text-indigo-700 dark:!text-slate-100"
        >
          {title}
        </Link>
      </h2>

      <div className="text-gray-600 dark:text-slate-300 text-sm dark:text-slate-100">
        {description}
      </div>
    </div>
  );
};

const SdkPage = () => {
  return (
    <div>
      <h1>Available SDKs</h1>

      <div className="grid grid-cols-2 gap-4">
        <SdkCard
          title="JavaScript"
          href="/docs/guides/javascript"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Client Side</strong>{" "}
              JavaScript SDK to use in your application running in the browser.
            </p>
          }
        />

        <SdkCard
          title="Node.js"
          href="/docs/guides/node-js"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Server Side</strong>{" "}
              JavaScript SDK to use in your application running in Node.js.
            </p>
          }
        />

        <SdkCard
          title="React"
          href="/docs/guides/react"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">React</strong> SDK.
              Works on the client, but also on the server.
            </p>
          }
        />

        <SdkCard
          title="PHP"
          href="/docs/guides/php"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">PHP</strong> SDK.
            </p>
          }
        />

        <SdkCard
          title="Go"
          href="/docs/guides/go"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Go</strong> SDK.
            </p>
          }
        />
      </div>
    </div>
  );
};

export default SdkPage;
