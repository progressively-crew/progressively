import { Link } from "@remix-run/react";
import { useRef } from "react";
import { IoLogoJavascript, IoLogoNodejs } from "react-icons/io5";
import { FaPhp, FaReact, FaPython } from "react-icons/fa";
import { SiGoland } from "react-icons/si";

interface SdkCardProps {
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

const SdkCard = ({ title, href, description, icon }: SdkCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      tabIndex={-1}
      className="relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 py-8 h-full drop-shadow cursor-pointer"
      onClick={() => linkRef?.current?.click()}
    >
      <span className="text-4xl">{icon}</span>
      <h2 className="text-base font-semibold mb-0 py-2">
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
          icon={<IoLogoJavascript style={{ color: "#f0db4f" }} />}
          title="JavaScript"
          href="/docs/developers/javascript"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Client Side</strong>{" "}
              JavaScript SDK to use in your application running in the browser.
            </p>
          }
        />

        <SdkCard
          icon={<IoLogoNodejs style={{ color: "#3c873a" }} />}
          title="Node.js"
          href="/docs/developers/node-js"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Server Side</strong>{" "}
              JavaScript SDK to use in your application running in Node.js.
            </p>
          }
        />

        <SdkCard
          icon={<FaReact style={{ color: "#61DBFB" }} />}
          title="React"
          href="/docs/developers/react"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">React</strong> SDK.
              Works on the client, but also on the server.
            </p>
          }
        />

        <SdkCard
          icon={<FaPhp style={{ color: "#232531" }} />}
          title="PHP"
          href="/docs/developers/php"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">PHP</strong> SDK.
            </p>
          }
        />

        <SdkCard
          icon={<SiGoland style={{ color: "#29BEB0" }} />}
          title="Go"
          href="/docs/developers/go"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Go</strong> SDK.
            </p>
          }
        />

        <SdkCard
          icon={<FaPython style={{ color: "#4B8BBE" }} />}
          title="Python"
          href="/docs/developers/python"
          description={
            <p className="m-0">
              The <strong className="dark:text-slate-100">Python</strong> SDK.
            </p>
          }
        />
      </div>
    </div>
  );
};

export default SdkPage;
