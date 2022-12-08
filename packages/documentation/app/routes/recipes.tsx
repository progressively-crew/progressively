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

export default function RecipeLayout() {
  return (
    <NavProvider>
      <div>
        <SiteNav />

        <InertWhenNavOpened>
          <Outlet />
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
}
