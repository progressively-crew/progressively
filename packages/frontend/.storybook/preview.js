import "../app/styles/fonts.css";
import "../app/styles/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ background: "#151722", height: "100vh", padding: "32px" }}>
      <Story />
    </div>
  ),
];
