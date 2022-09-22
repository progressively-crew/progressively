import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CreateButton as CreateButtonRaw } from "../../Buttons/CreateButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/CreateButton",
  component: CreateButtonRaw,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CreateButtonRaw>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof CreateButtonRaw> = (args) => (
  <CreateButtonRaw {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Click me",
};
