export const showQualitativeAnalytics = (endpoint: string) => {
  const script = document.createElement("script");
  script.src = `/progressively.qualitative-analytics.min.js`;
  script.setAttribute("data-progressively-endpoint", endpoint);

  document.body.appendChild(script);
};
