<template>
  <div v-if="flagsRef.newHomepage">New homepage</div>
  <div v-else>Old homepage</div>
</template>

<script setup lang="ts">
import { FlagDict, Progressively } from "@progressively/sdk-js";
import { getProgressivelyData } from "@progressively/server-side";

const EnvKey = "valid-sdk-key";
const config = {
  websocketUrl: "ws://localhost:4000",
  apiUrl: "http://localhost:4000",
};

let initialFlagsx = {};

if (process.server) {
  const { data } = await getProgressivelyData(EnvKey, config);
  initialFlagsx = data.initialFlags || {};
}

const flagsRef = useState<FlagDict>("initialFlags", () => initialFlagsx);

onMounted(async () => {
  const sdk = Progressively.init(EnvKey, {
    ...config,
    initialFlags: flagsRef.value,
  });

  sdk.onFlagUpdate((nextFlags) => {
    flagsRef.value = nextFlags;
  });
});
</script>
