import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { InertWhenNavOpened } from "~/components/Nav/InertWhenNavOpened";
import { NavProvider } from "~/components/Nav/providers/NavProvider";
import theme from "highlight.js/styles/github.css";
import shared from "../../styles/shared.css";
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

export default function BlogPostLayout() {
  return (
    <Background>
      <NavProvider>
        <div>
          <SiteNav />

          <InertWhenNavOpened>
            <div className="py-4 xl:py-12 max-w-screen-2xl mx-auto px-4 xl:px-12">
              <main className="prose lg:prose-x mx-auto">
                <Outlet />
              </main>
            </div>
          </InertWhenNavOpened>
        </div>
      </NavProvider>
    </Background>
  );
}
