import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { InertWhenNavOpened } from "~/components/Nav/InertWhenNavOpened";
import { NavProvider } from "~/components/Nav/providers/NavProvider";
import theme from "highlight.js/styles/github.css";
import shared from "../styles/shared.css";
import { SiteNav } from "~/components/SiteNav";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: theme,
    },
    {
      rel: "stylesheet",
      href: shared,
    },
  ];
};

export default function BlogLayout() {
  return (
    <NavProvider>
      <div>
        <SiteNav />

        <InertWhenNavOpened>
          <div className="py-4 md:py-12 px-4 md:px-0">
            <main className="prose lg:prose-x mx-auto">
              <Outlet />
            </main>
          </div>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
}
