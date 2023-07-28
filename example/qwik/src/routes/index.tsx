import { loader$ } from "@builder.io/qwik-city";
import {
  component$,
  useBrowserVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { FlagDict } from "@progressively/server-side";
import { Progressively as PServer } from "@progressively/server-side";
import { Progressively } from "@progressively/sdk-js";

export const useFlags = loader$(async ({ cookie }) => {
  const id = cookie.get("progressively-id");

  const sdk = PServer.init("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      id: id?.value,
    },
  });

  const { data, userId } = await sdk.loadFlags();

  cookie.set("progressively-id", userId);

  return data;
});

export default component$(() => {
  const signal = useFlags();
  const flags = useSignal<FlagDict>(signal.value.flags || {});

  useBrowserVisibleTask$(
    async () => {
      const sdk = Progressively.init(
        String(signal.value.clientKey),
        signal.value
      );

      sdk.onFlagUpdate((nextFlags: FlagDict) => {
        flags.value = nextFlags;
      });

      return () => {
        sdk.disconnect();
      };
    },
    { strategy: "document-ready" }
  );

  return (
    <main>
      <div>
        <h1>Qwik</h1>
        <h2>New homepage</h2>
        {flags.value.newHomepage ? "New variant" : "Old variant"}
      </div>

      <footer>{flags.value.newFooter ? "New footer" : "Old footer"}</footer>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
