import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { Box } from "../Box";
import { SuccessBox } from "~/components/Boxes/SuccessBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Layouts/DashboardLayout",
  component: DashboardLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DashboardLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof DashboardLayout> = () => (
  <DashboardLayout
    header={<Box />}
    status={<SuccessBox id="success">Hello world</SuccessBox>}
    breadcrumb={<Box />}
  >
    <Box />
  </DashboardLayout>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
