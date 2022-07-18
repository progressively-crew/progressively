import {
  GrowthBook,
  GrowthBookProvider,
  IfFeatureEnabled,
} from "@growthbook/growthbook-react";
import { useEffect } from "react";

const FEATURES_ENDPOINT = "http://localhost:3100/api/features/key_abc123";

const FlaggedComponent = () => {
  return (
    <IfFeatureEnabled feature="welcome-message">
      <p>I hope you enjoy this site and have a great day!</p>
    </IfFeatureEnabled>
  );
};

// Create a GrowthBook instance
const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", experiment, result);
  },
});

export default function MyApp() {
  // Refresh features and targeting attributes on navigation
  useEffect(() => {
    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      });

    growthbook.setAttributes({
      id: "123",
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <FlaggedComponent />
    </GrowthBookProvider>
  );
}
