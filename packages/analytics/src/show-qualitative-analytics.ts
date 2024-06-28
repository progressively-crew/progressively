export const showQualitativeAnalytics = (endpoint: string) => {
  const script = document.createElement("script");
  //script.src = `https://progressively.app/progressively.qualitative-analytics.min.js`;
  script.src = `http://localhost:4321/progressively.qualitative-analytics.min.js`;
  script.setAttribute("data-progressively-endpoint", endpoint);

  document.body.appendChild(script);
};
