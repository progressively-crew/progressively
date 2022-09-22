import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextInput } from "../../Fields/TextInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/TextInput",
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Email",
  description: "This is an email field",
  placeholder: "e.g: john.doe@gmail.com",
};
