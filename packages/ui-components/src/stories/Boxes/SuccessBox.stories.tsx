import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SuccessBox } from "../../Boxes/SuccessBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Boxes/SuccessBox",
  component: SuccessBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SuccessBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof SuccessBox> = (args) => (
  <SuccessBox {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "This is successful",
};
