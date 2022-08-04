import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Typography } from "../../Typography";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Text/Typography",
  component: Typography,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Typography>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof Typography> = (args) => (
  <div>
    {["venus", "saturn", "earth", "mars", "jupiter", "uranus", "neptune"].map(
      (size) => (
        <Typography key={size} size={size}>
          {size}
        </Typography>
      )
    )}
  </div>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Hello, Typograpy",
};
