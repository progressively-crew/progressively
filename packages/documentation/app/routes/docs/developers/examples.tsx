import { useRef } from "react";
import { IoLogoNodejs, IoLogoVercel } from "react-icons/io5";
import { FaPhp, FaPython, FaReact } from "react-icons/fa";
import { SiGoland, SiSvelte } from "react-icons/si";
import { AstroIcon } from "~/components/icons/AstroIcon";
import { RemixIcon } from "~/components/icons/RemixIcon";

interface ExampleProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const Example = ({ title, href, icon }: ExampleProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      tabIndex={-1}
      className="relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 py-8 h-full relative drop-shadow cursor-pointer"
      onClick={() => linkRef?.current?.click()}
    >
      <span className="text-4xl">{icon}</span>
      <h2 className="text-base font-semibold mb-0 py-2">
        <a
          href={href}
          ref={linkRef}
          className="!text-indigo-700 dark:!text-slate-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
    </div>
  );
};

const ExamplePage = () => {
  return (
    <div>
      <h1>Examples</h1>
      <p>
        <a
          href="https://github.com/progressively-crew/progressively/tree/master/.github/workflows"
          target="_blank"
          rel="noopener noreferrer"
        >
          Progressively's pipeline{" "}
        </a>
        owns a bunch of E2E tests running on applications built with the
        different SDKs. They can be used as minimal examples of Progressively
        usage.
      </p>

      <section>
        <h2>Frontend</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Example
            icon={<IoLogoVercel />}
            title="Next.js"
            href="https://github.com/progressively-crew/progressively/tree/master/example/nextjs"
          />

          <Example
            icon={<RemixIcon className="h-9 w-9" />}
            title="Remix"
            href="https://github.com/progressively-crew/progressively/blob/master/packages/documentation/app/root.tsx#L86"
          />

          <Example
            icon={<SiSvelte />}
            title="Svelte"
            href="https://github.com/progressively-crew/progressively/tree/master/example/svelte"
          />

          <Example
            icon={<AstroIcon className="h-9 w-9" />}
            title="Astro"
            href="https://github.com/progressively-crew/progressively/tree/master/example/astro"
          />

          <Example
            icon={<FaReact style={{ color: "#61DBFB" }} />}
            title="CRA"
            href="https://github.com/progressively-crew/progressively/tree/master/example/cra"
          />
        </div>
      </section>

      <section className="pt-8">
        <h2>Backend</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Example
            icon={<IoLogoNodejs style={{ color: "#3c873a" }} />}
            title="Node.js"
            href="https://github.com/progressively-crew/progressively/tree/master/example/node"
          />
          <Example
            icon={<FaPhp style={{ color: "#232531" }} />}
            title="PHP"
            href="https://github.com/progressively-crew/sdk-php"
          />

          <Example
            icon={<SiGoland style={{ color: "#29BEB0" }} />}
            title="Go"
            href="https://github.com/progressively-crew/sdk-go"
          />

          <Example
            icon={<FaPython style={{ color: "#4B8BBE" }} />}
            title="Python"
            href="https://github.com/progressively-crew/sdk-python"
          />
        </div>
      </section>
    </div>
  );
};

export default ExamplePage;
