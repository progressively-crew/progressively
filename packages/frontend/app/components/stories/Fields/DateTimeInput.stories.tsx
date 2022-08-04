import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DateTimeInput } from "../../Fields/DateTimeInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/DateTimeInput",
  component: DateTimeInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DateTimeInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof DateTimeInput> = (args) => (
  <DateTimeInput {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Date and time",
  description: "This is an email field",
};
