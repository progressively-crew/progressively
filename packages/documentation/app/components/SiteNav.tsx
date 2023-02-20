import { Link } from "@remix-run/react";
import { HideTablet } from "./HideMobile";
import { Logo } from "./Logo";

const NavLink = ({
  children,
  to,
  href,
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
}) => {
  const className =
    "no-underline font-semibold hover:underline text-slate-200 active:text-slate-400";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to!} className={className}>
      {children}
    </Link>
  );
};

export const SiteNav = () => {
  return (
    <nav className="h-14 px-4 md:px-12 bg-slate-900 py-12">
      <div className="max-w-screen-2xl mx-auto h-full">
        <div className="flex flex-row items-center h-full justify-between">
          <div>
            <HideTablet>
              <Link to="/">
                <Logo aria-label="Progressively" className="h-8 w-8" />
              </Link>
            </HideTablet>
          </div>

          <ul className="flex flex-row gap-8">
            <li>
              <NavLink href="https://progressively.gitbook.io/docs/">
                Documentation
              </NavLink>
            </li>
            <li className="hidden md:block">
              <NavLink href="https://dashboard.progressively.app">
                Demo instance
              </NavLink>
            </li>
            <li>
              <NavLink href="https://github.com/progressively-crew/progressively">
                Github
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
