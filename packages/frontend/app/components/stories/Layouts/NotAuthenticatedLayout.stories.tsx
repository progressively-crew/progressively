import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NotAuthenticatedLayout } from "../../../layouts/NotAuthenticatedLayout";
import { Box } from "./Box";
import { SuccessBox } from "~/components/SuccessBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Layouts/NotAuthenticatedLayout",
  component: NotAuthenticatedLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotAuthenticatedLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof NotAuthenticatedLayout> = (
  args
) => (
  <NotAuthenticatedLayout
    nav={<Box />}
    header={<Box />}
    status={<SuccessBox id="success">Hello world</SuccessBox>}
  >
    <Box />
  </NotAuthenticatedLayout>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
