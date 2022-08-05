import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ErrorBox } from "../../Boxes/ErrorBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Boxes/ErrorBox",
  component: ErrorBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ErrorBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof ErrorBox> = (args) => (
  <ErrorBox {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  list: { error: "Some error", another: "Another one" },
};
