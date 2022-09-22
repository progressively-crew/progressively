import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HStack } from "../HStack";
import { Box } from "./Box";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/HStack",
  component: HStack,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HStack>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof HStack> = () => (
  <HStack spacing={4}>
    <Box />
    <Box />
    <Box />
  </HStack>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Marvin Frachet",
};
