import { Features } from "~/components/Features";
import { Hero } from "~/components/Hero";

export default function Index() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
