export const Component = () => {
  return (
    <>
      <FeatureFlag showWhen="newHomepage">
        <div>Visible when feature flag is activated</div>
      </FeatureFlag>
      <FeatureFlag hideWhen="newHomepage">
        <div>Not visible when feature flag is activated</div>
      </FeatureFlag>
    </>
  );
};
