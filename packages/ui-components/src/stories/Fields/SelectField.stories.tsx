import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SelectField } from "../../Fields/SelectField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/SelectField",
  component: SelectField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SelectField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof SelectField> = (args) => (
  <SelectField {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Select something",
  options: [
    { value: "ComparatorEnum.Equals", label: "Equals" },
    { value: "ComparatorEnum.NotEquals", label: "Not equals" },
    { value: "ComparatorEnum.Contains", label: "Contains" },
  ],
};
