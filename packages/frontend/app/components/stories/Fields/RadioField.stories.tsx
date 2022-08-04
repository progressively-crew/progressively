import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RadioField } from "../../Fields/RadioField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/RadioField",
  component: RadioField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RadioField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof RadioField> = (args) => (
  <RadioField {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: "Select something",
  options: [
    { value: "ComparatorEnum.Equals", label: "Equals" },
    { value: "ComparatorEnum.NotEquals", label: "Not equals" },
    { value: "ComparatorEnum.Contains", label: "Contains" },
  ],
};
