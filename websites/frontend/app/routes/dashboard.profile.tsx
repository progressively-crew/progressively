import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile",
    },
  ];
};

export default function ProfilePage() {
  return <Outlet />;
}
