import { transform } from "../helpers/transform";
import { SampleReturn } from "./types";

export const setupAnalytics = async (clientKey: string): SampleReturn => {
  const installation = ``;
  const rawCode = `<script
  data-progressively-client-key="${clientKey}"

  {/**
    (Optional) Activate the qualitative tracking meaning that clicks will be registered and logs.
    It unlocks the heatmap section of your analytics dashboard
  */}
  data-progressively-qualitative-tracking="true"
></script>
      `;

  return { rawCode, html: await transform(rawCode), installation };
};
