<script>
  import { Progressively } from "@progressively/sdk-js";
  import { onMount } from "svelte";

  export let data;

  let flags = data.initialFlags;

  onMount(() => {
    const sdk = Progressively.init(data.clientKey, data);

    sdk.onFlagUpdate((nextFlags) => {
      flags = nextFlags;
    });
  });
</script>

<main>
  <div>
    <h1>New homepage</h1>
    {flags.newHomepage ? "New variant" : "Old variant"}
  </div>

  <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer>
</main>
