import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExternalLink } from "../../ExternalLink";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Links/ExternalLink",
  component: ExternalLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ExternalLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof ExternalLink> = (args) => (
  <ExternalLink {...args} />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  href: "/",
  children: "Navigate",
};
