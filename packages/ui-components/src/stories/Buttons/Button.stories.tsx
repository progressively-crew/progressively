import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../../Buttons/Button";
import { HStack } from "../../HStack";
import { Stack } from "../../Stack";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Buttons/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof Button> = (args) => (
  <Stack spacing={8}>
    <HStack spacing={4}>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="tertiary" />
    </HStack>

    <HStack spacing={4}>
      <Button {...args} variant="primary" scheme="danger" />
      <Button {...args} variant="secondary" scheme="danger" />
      <Button {...args} variant="tertiary" scheme="danger" />
    </HStack>
  </Stack>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Click me",
};
