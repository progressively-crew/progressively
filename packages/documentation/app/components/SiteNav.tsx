import { Link } from "@remix-run/react";
import { HideTablet } from "./HideMobile";
import { Logo } from "./Logo";
import { InertWhenNavOpened } from "./Nav/InertWhenNavOpened";

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
    "font-semibold hover:underline text-gray-800 active:text-gray-600";
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

export interface SiteNavProps {
  navToggleSlot?: React.ReactNode;
}
export const SiteNav = ({ navToggleSlot }: SiteNavProps) => {
  return (
    <InertWhenNavOpened>
      <nav className="h-14 border-b border-b-gray-100 px-4 md:px-12 bg-white dark:bg-slate-800 dark:border-b-slate-700">
        <div className="max-w-screen-2xl mx-auto h-full">
          <div className="flex flex-row items-center h-full justify-between">
            <div>
              <HideTablet>
                <Link to="/">
                  <Logo aria-label="Progressively" className="h-8 w-8" />
                </Link>
              </HideTablet>

              {navToggleSlot}
            </div>

            <ul className="flex flex-row gap-8">
              {/* <li>
                <NavLink to="/blog">Blog</NavLink>
              </li> */}
              <li>
                <NavLink to="/docs/introduction/why">Documentation</NavLink>
              </li>
              <li className="hidden md:block">
                <NavLink href="https://frontend-progressively.fly.dev/signin">
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
    </InertWhenNavOpened>
  );
};
