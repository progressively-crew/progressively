import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export default function Index() {
  return <div>Lol</div>;
}
