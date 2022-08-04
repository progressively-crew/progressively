import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DeleteButton as DeleteButtonRaw } from "../../Buttons/DeleteButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/DeleteButton",
  component: DeleteButtonRaw,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DeleteButtonRaw>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof DeleteButtonRaw> = (args) => (
  <DeleteButtonRaw {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Click me",
};
