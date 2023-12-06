import { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile",
    },
  ];
};

export default function ProfilePage() {
  return <Outlet />;
}
