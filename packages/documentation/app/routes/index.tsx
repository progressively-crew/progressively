import { Example } from "~/components/Example";
import { Features } from "~/components/Features";
import { GetStarted } from "~/components/GetStarted";
import { Hero } from "~/components/Hero";

export default function Index() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />
        <Features />
        <Example />
        <GetStarted />
      </main>
    </div>
  );
}
