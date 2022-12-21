import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { HideDesktop } from "~/components/HideMobile";
import { Nav } from "~/components/Nav";
import { InertWhenNavOpened } from "~/components/Nav/InertWhenNavOpened";
import { NavToggle } from "~/components/Nav/NavToggle";
import { NavProvider } from "~/components/Nav/providers/NavProvider";
import theme from "highlight.js/styles/github.css";
import shared from "../styles/shared.css";
import { SiteNav } from "~/components/SiteNav";
import { Background } from "~/components/Background";

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

export default function DocsLayout() {
  return (
    <Background>
      <NavProvider>
        <div>
          <SiteNav
            navToggleSlot={
              <HideDesktop>
                <NavToggle />
              </HideDesktop>
            }
          />

          <div className="py-4 xl:py-12 max-w-screen-2xl mx-auto px-4 xl:px-12">
            <div className={"lg:grid lg:grid-cols-[240px_1fr] lg:gap-12"}>
              <Nav />

              <InertWhenNavOpened>
                <main className="prose lg:prose-x dark:prose-invert">
                  <Outlet />
                </main>
              </InertWhenNavOpened>
            </div>
          </div>
        </div>
      </NavProvider>
    </Background>
  );
}
