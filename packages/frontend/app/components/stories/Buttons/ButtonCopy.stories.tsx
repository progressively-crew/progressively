import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ButtonCopy } from "../../ButtonCopy";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/ButtonCopy",
  component: ButtonCopy,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonCopy>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof ButtonCopy> = (args) => (
  <ButtonCopy {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Click me",
  toCopy: "Copy me",
};
