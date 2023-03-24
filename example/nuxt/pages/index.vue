<template>
  <div v-if="flagsRef.newHomepage">New variant</div>
  <div v-else>Old variant</div>

  <div v-if="flagsRef.newFooter">New footer</div>
  <div v-else>Old footer</div>
</template>

<script setup lang="ts">
import { FlagDict, Progressively } from "@progressively/sdk-js";
import { getProgressivelyData } from "@progressively/server-side";

const EnvKey = "valid-sdk-key";
const config = {
  websocketUrl: "ws://localhost:4000",
  apiUrl: "http://localhost:4000",
};

const cookie = useCookie("progressively-id");

let initialFlagsx = {};

if (process.server) {
  const { data, userId } = await getProgressivelyData(EnvKey, config);
  initialFlagsx = data.initialFlags || {};
  cookie.value = "ofjazofjzaofj";
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
