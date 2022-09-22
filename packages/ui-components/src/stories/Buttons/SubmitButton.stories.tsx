import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SubmitButton as SubmitButtonRaw } from "../../Buttons/SubmitButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/SubmitButton",
  component: SubmitButtonRaw,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SubmitButtonRaw>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof SubmitButtonRaw> = (args) => (
  <SubmitButtonRaw {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Click me",
};
