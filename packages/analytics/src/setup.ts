export const setup = () => {
  const scriptEl = window.document.currentScript;

  const endpoint = scriptEl?.getAttribute("data-progressively-endpoint");
  const clientKey = scriptEl?.getAttribute("data-progressively-client-key");
  const shouldTrackQuantitative = scriptEl?.getAttribute(
    "data-progressively-qualitative-tracking"
  );

  if (!endpoint || !clientKey) {
    throw new Error(
      "[Progressively]: [data-progressively-endpoint] and [data-progressively-client-key] attributes should be set on the script tag."
    );
  }

  const fields = {
    clientKey: clientKey,
  };

  const bSixtyFour = btoa(JSON.stringify(fields));
  return { endpoint, bSixtyFour, shouldTrackQuantitative };
};
