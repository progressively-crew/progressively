import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextareaInput } from "../../Fields/TextareaInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/TextareaInput",
  component: TextareaInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TextareaInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof TextareaInput> = (args) => (
  <TextareaInput {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Email",
  placeholder: "e.g: john.doe@gmail.com",
};
