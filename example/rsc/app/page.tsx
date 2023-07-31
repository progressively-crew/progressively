import { FlaggedComponent } from "./components/FlaggedComponent.server";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* @ts-expect-error Server Component */}
      <FlaggedComponent />
    </main>
  );
}

export const dynamic = "force-dynamic";
