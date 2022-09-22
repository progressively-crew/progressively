import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackLink } from "../../BackLink";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Links/BackLink",
  component: BackLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BackLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof BackLink> = (args) => (
  <BackLink {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  to: "/",
  children: "Navigate",
};
