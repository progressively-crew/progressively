export const showQualitativeAnalytics = () => {
  const script = document.createElement("script");
  script.src = `/progressively.qualitative-analytics.min.js`;

  document.body.appendChild(script);
};
