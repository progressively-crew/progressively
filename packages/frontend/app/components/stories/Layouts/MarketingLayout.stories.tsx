import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MarketingLayout } from "../../../layouts/MarketingLayout";
import { Box } from "../Box";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Layouts/MarketingLayout",
  component: MarketingLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MarketingLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof MarketingLayout> = (args) => (
  <MarketingLayout>
    <Box />
  </MarketingLayout>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
