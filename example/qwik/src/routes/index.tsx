import { loader$ } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getProgressivelyData } from "@progressively/server-side";

export const useFlags = loader$(async ({ cookie }) => {
  const userId = cookie.get("progressively-id");

  const { data, response } = await getProgressivelyData("valid-sdk-key", {
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
    fields: {
      id: userId?.value,
    },
  });

  const headerId = response?.headers?.get("X-progressively-id");

  if (headerId) {
    cookie.set("progressively-id", headerId);
  }

  return data;
});

export default component$(() => {
  const signal = useFlags();

  return (
    <main>
      <div>
        <h1>New homepage {signal.value.time}</h1>
        {/* {flags.newHomepage ? "New variant" : "Old variant"} */}
      </div>

      {/* <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer> */}
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
