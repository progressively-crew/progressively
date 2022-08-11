import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SliderInput } from "../../Fields/SliderInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Fields/SliderInput",
  component: SliderInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SliderInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof SliderInput> = (args) => {
  const [percentage, setPercentage] = useState(50);
  return (
    <SliderInput
      onChange={setPercentage}
      percentageValue={percentage}
      label={args.label}
      name={args.name}
    />
  );
};
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Range",
  name: "range",
};
