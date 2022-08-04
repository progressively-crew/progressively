import "../app/styles/fonts.css";
import "../app/styles/index.css";
import { MemoryRouter } from "react-router-dom";

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
    <MemoryRouter>
      <div style={{ background: "#151722", height: "100vh", padding: "32px" }}>
        <Story />
      </div>
    </MemoryRouter>
  ),
];
