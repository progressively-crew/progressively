import { Outlet } from "@remix-run/react";
import { HideDesktop } from "~/components/HideMobile";
import { Nav } from "~/components/Nav";
import { InertWhenNavOpened } from "~/components/Nav/InertWhenNavOpened";
import { NavToggle } from "~/components/Nav/NavToggle";
import { NavProvider } from "~/components/Nav/providers/NavProvider";

export default function DocsLayout() {
  return (
    <NavProvider>
      <div>
        <InertWhenNavOpened>
          <div className="flex h-14 items-center border-b border-b-color-gray-500">
            <div className=" max-w-screen-2xl px-4 md:px-12">
              <HideDesktop>
                <NavToggle />
              </HideDesktop>
            </div>
          </div>
        </InertWhenNavOpened>

        <div className="max-w-screen-2xl mx-auto p-4 md:p-12">
          <div className={"lg:grid lg:grid-cols-[240px_1fr] lg:gap-12"}>
            <Nav />

            <InertWhenNavOpened>
              <div className="prose lg:prose-x">
                <Outlet />
              </div>
            </InertWhenNavOpened>
          </div>
        </div>
      </div>
    </NavProvider>
  );
}
