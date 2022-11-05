import { Outlet } from "@remix-run/react";
import { HideDesktop } from "~/components/HideMobile";
import { Nav } from "~/components/Nav";
import { NavToggle } from "~/components/Nav/NavToggle";
import { NavProvider } from "~/components/Nav/providers/NavProvider";

export default function DocsLayout() {
  return (
    <NavProvider>
      <div>
        <div className="flex justify-between h-14 items-center border-b border-b-color-gray-500">
          <div className=" max-w-screen-2xl mx-auto p-12">
            <HideDesktop>
              <NavToggle />
            </HideDesktop>
          </div>
        </div>

        <div className=" max-w-screen-2xl mx-auto p-12">
          <div
            className={"grid grid-cols-[1fr] lg:grid-cols-[240px_1fr] gap-12"}
          >
            <Nav />

            <div className="prose lg:prose-x">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </NavProvider>
  );
}
