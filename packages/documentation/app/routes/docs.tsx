import { Outlet } from "@remix-run/react";
import { DocMenu } from "~/components/DocMenu";

export default function DocsLayout() {
  return (
    <div className=" max-w-screen-2xl mx-auto p-12">
      <div className={"grid grid-cols-[1fr] lg:grid-cols-[280px_1fr] gap-12"}>
        <DocMenu />

        <div className="prose lg:prose-x">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
