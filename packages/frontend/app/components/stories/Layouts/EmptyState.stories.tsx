import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EmptyState } from "../../EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Typography } from "~/components/Typography";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Layouts/EmptyState",
  component: EmptyState,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EmptyState>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState
    title="No environments found"
    description={<Typography>There are no XXX yet</Typography>}
    action={<CreateButton to={`/dashboard`}>Create XYZ</CreateButton>}
  />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
